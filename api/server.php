<?php 

abstract class Server {

  public $requestMethod;
  public $body;

  function __construct(){
    
    if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) 
      && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) 
      && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
        
        $this->requestMethod = strtolower($_SERVER['REQUEST_METHOD']);  
        if ($this->requestMethod == 'post') {
          $this->body = $_POST;
        }
        
        $this->body =array();
      } 
  }
  
}