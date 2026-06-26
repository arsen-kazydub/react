<?php
/**
 * Plugin Name: Salary Statistics API
 * Description: Provides salary statistics data for the Salary Statistics React application. In public mode, instead of private data, demo salaries will be generated.
 * Version: 1.0.0
 * Author: Arsen Kazydub
 * Author URI: https://github.com/arsen-kazydub
 * License: GPL v2 or later
 * Text Domain: salary-statistics-api
 */

if ( ! defined( 'ABSPATH' ) ) {
  exit;
}


const SSA_PRIVATE_TOKEN = 'secret_token';


/* Salaries CPT - REST API endpoint */
add_action( 'rest_api_init', function(): void {
  register_rest_route( 'salaries/v1', '/all', [
    'methods'             => 'GET',
    'callback'            => 'ssa_get_data',
    'permission_callback' => '__return_true',
  ] );
} );


/* Returns real data for authorized users and demo data for public visitors. */
function ssa_get_data(): array {
  return ssa_has_private_access()
    ? ssa_get_salaries()
    : ssa_generate_salaries();
}


/* Checks whether the visitor has private access. */
function ssa_has_private_access(): bool {
  $token = $_GET[ 'token' ] ?? '';
  return $token === SSA_PRIVATE_TOKEN;
}


/* Returns salaries from the Salaries CPT. */
function ssa_get_salaries(): array {
  global $wpdb;

  $data = [];

  $posts = $wpdb->get_results( "
    SELECT ID, post_title
    FROM {$wpdb->posts}
    WHERE post_type = 'salaries'
      AND post_status = 'publish'
  " );

  foreach ( $posts as $post ) {

    $meta = $wpdb->get_results(
      $wpdb->prepare( "
        SELECT meta_key, meta_value
        FROM {$wpdb->postmeta}
        WHERE post_id = %d
      ", $post->ID ),
      ARRAY_A
    );

    if ( ! $meta ) continue;

    $salaries = [];

    foreach ( $meta as $row ) {
      $key = $row[ 'meta_key' ];
      $value = $row[ 'meta_value' ];

      // skip private meta (fields starting on '_')
      if ( strpos( $key, '_' ) === 0 ) {
        continue;
      }

      $salaries[ $key ] = (int) $value;
    }

    $year = $post->post_title;

    // sort by key names and then remove the keys
    ksort( $salaries, SORT_NATURAL );
    $salaries = array_values( $salaries );

    $data[ $year ] = $salaries;
  }

  return $data;
}


/* Generates salaries for the last 5 years. */
function ssa_generate_salaries(): array {
  $current_year = date( 'Y' );
  $data = [];

  for ( $i = $current_year - 1; $i >= $current_year - 5; $i-- ) {

    for ( $j = 0; $j < 12; $j++ ) {
      // expected average salary is 2500
      $salary = ( 25 + mt_rand( 15, 35 ) ) / 2;

      // 80% of months are normal, 10% are worse, and 10% are better
      $luck = mt_rand( 1, 10 );

      if ( $luck === 1 ) {
        $salary *= mt_rand( 6, 8 ) / 10;
      }
      elseif ( $luck === 2 ) {
        $salary *= mt_rand( 11, 13 ) / 10;
      }

      $data[ $i ][ $j ] = round( $salary ) * 100;
    }

  }

  return $data;
}