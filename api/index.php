<?php

include_once 'request.php';
include_once 'router.php';


abstract class Ajax {
  public $isAjax;
  function __construct(){
    if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) 
      && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) 
      && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
        $this->isAjax = true;
      } else {
        $this->isAjax = false;
      }
  }
  abstract public function handleRequests();
}

class AjaxRequests extends Ajax {
 
  public function handleRequests(){
    if ($this->isAjax){
      $ajaxRouter = new Router(new Request);
      $ajaxRouter->get('/api/data', function($request) {
        return json_encode(array('response'=>"Lorem ipsum dolor sit amet, consectetur adipisicing eli"));
      });
    }
  }

}

abstract class Http {
  abstract public function handleRequests();
}

class HttpRequests extends Http {
  public function handleRequests(){
    
  }
}

$ajax = new AjaxRequests();
$ajax->handleRequests();

?>


