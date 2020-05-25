<?php
include_once 'server.php';

class handleRequests extends Server {

  private $callSubscriptions;
  
  //method subsciption to callback
  function call($method, $callback){
    $this->callSubscriptions[strtolower($method)] = $callback;
  }
  
  function bootstrap(){
    echo call_user_func_array($this->callSubscriptions[$this->requestMethod], $this->body);
  }
}

$api = new handleRequests();

$api->call('get', function (){
  return json_encode(array('response'=>"Lorem ipsum dolor sit amet, consectetur adipisicing eli"));
});

$api->call('post', function (){
  return json_encode(array('response'=>"from post"));
});

//start
$api->bootstrap();