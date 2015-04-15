<?php
# FileName="Connection_php_mysql.htm"
# Type="MYSQL"
# HTTP="true"
$hostname_db_conn = "sermonmanager.db.9414262.hostedresource.com";
$database_db_conn = "sermonmanager";
$username_db_conn = "sermonmanager";
$password_db_conn = "Manuel@2014";
$db_conn = mysql_pconnect($hostname_db_conn, $username_db_conn, $password_db_conn) or trigger_error(mysql_error(),E_USER_ERROR);
@mysql_query("SET NAMES 'utf8'"); 
?>