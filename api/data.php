<?php
include_once 'server.php';

class handleRequests extends Server{

  private $subscribe;
  
  //ajax method subsciption to callback
  function route($method, $callback){
    $this->subscribe[strtolower($method)] = $callback;
  }
  
  function bootstrap(){
    echo call_user_func_array($this->subscribe[$this->requestMethod], $this->body);
  }
}

$api = new handleRequests();

// route
$api->route('get', function (){
  return json_encode(array('response'=>"Lorem ipsum dolor sit amet, consectetur adipisicing eli"));
});

$api->route('post', function (){
  return json_encode(array('response'=>"from post"));
});

//start
$api->bootstrap();