<?php

require_once('functions.php');

// if a user is not authorized, load demo data
$salaries = ars_access() ? get_salaries() : generate_salaries();

?>

<div id="salary" data-salaries='<?php echo json_encode($salaries); ?>'></div>