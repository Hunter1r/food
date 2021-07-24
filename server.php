<?php
$_POST = json_decode(file_get_contents("php://input"),true); //нужно для преобразования входящих данных в json.Если входящие данные FormData то не нужно
echo(var_dump($_POST));