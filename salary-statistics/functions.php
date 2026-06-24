<?php

require_once('../../../www/wp-load.php');
require_once('config.php');


/**
 * Authorization.
 * @return bool
 */
function ars_access(): bool {
  $access = false;

  if (array_key_exists(USER, $_SESSION) && $_SESSION[USER] === PASS) {
    $access = true;
  }
  else if (array_key_exists(USER, $_GET) && $_GET[USER] === PASS) {
    $_SESSION[USER] = $_GET[USER];
    // redirect to clear REQUEST data
    $uri = $_SERVER['REQUEST_URI'];
    $redirect = substr($uri, 0, strpos($uri, '?'));
    header('Location: ' . $redirect);
  }
  return $access;
}


/**
 * Generate salaries for the last 5 years.
 * @return array
 */
function generate_salaries(): array {
  $current_year = date('Y');
  $data = [];
  for ($i = $current_year - 1; $i >= $current_year - 5; $i--) {
    for ($j = 0; $j < 12; $j++) {
      $data[$i][$j] = mt_rand(20, 60) * 100;
    }
  }
  return $data;
}


/**
 * Get records from the Salaries post type.
 * @return array
 */
function get_salaries(): array {
  global $wpdb;

  $data = [];

  $posts = $wpdb->get_results("
    SELECT ID, post_title
    FROM {$wpdb->posts}
    WHERE post_type = 'salaries'
      AND post_status = 'publish'
  ");

  foreach ($posts as $post) {

    $meta = $wpdb->get_results(
      $wpdb->prepare("
        SELECT meta_key, meta_value
        FROM {$wpdb->postmeta}
        WHERE post_id = %d
      ", $post->ID),
      ARRAY_A
    );

    if (!$meta) continue;

    $salaries = [];

    foreach ($meta as $row) {
      $key = $row['meta_key'];
      $value = $row['meta_value'];

      // skip private meta (fields starting on '_')
      if (str_starts_with($key, '_')) {
        continue;
      }

      $salaries[$key] = (int) $value;
    }

    $year = $post->post_title;

    // sort by key names and then remove the keys
    ksort($salaries, SORT_NATURAL);
    $salaries = array_values($salaries);

    $data[$year] = $salaries;
  }

  return $data;
}