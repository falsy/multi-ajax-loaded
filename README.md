# Multi-Ajax Loaded
동시에 실행되는 비동기 통신들이 모두 끝나는 시점을 확인합니다.

## example

``` js
jQuery(document).ready(function($){

  $.multiAjax.totalSuccess = function() {
    console.log('모든 통신이 끝났습니다.');
  };

  $.multiAjax.aaa = function() {
    console.log('ajaxOne(), ajaxTwo() 통신이 끝났습니다');
  };

  $.multiAjax.bbb = function() {
    console.log('ajaxThree(), ajaxFour() 통신이 끝났습니다');
  };

  $.multiAjax.error = function() {
    console.log('error');
  };

  function ajaxOne(){
    $.multiAjax.start('aaa');
    $.ajax({
      url: "test1.html",
      context: document.body
    }).done(function() {
      $.multiAjax.end('aaa');
      $( this ).addClass( "done" );
    });
  }

  function ajaxTwo(){
    $.multiAjax.start('aaa');
    $.ajax({
      url: "test2.html",
      context: document.body
    }).done(function() {
      $.multiAjax.end('aaa');
      $( this ).addClass( "done" );
    });
  }

  function ajaxThree(){
    $.multiAjax.start('bbb');
    $.ajax({
      url: "test3.html",
      context: document.body
    }).done(function() {
      $.multiAjax.end('bbb');
      $( this ).addClass( "done" );
    });
  }

  function ajaxFour(){
    $.multiAjax.start('bbb');
    $.ajax({
      url: "test3.html",
      context: document.body
    }).done(function() {
      $.multiAjax.end('bbb');
      $( this ).addClass( "done" );
    });
  }

  ajaxOne();
  ajaxTwo();
  ajaxThree();
  ajaxFour();

});
```


``` js
  // AngularJs

  $scope.$watch(function(){
    return $.multiAjax.percentage;
  }, function(value) {
    console.log(value + '%');
  });

  // 25%
  // 50%
  // 75%
  // 100%
```

## Change Log
##### v0.0.7
* 비동기 통신의 진행률을 출력합니다.

##### v0.0.6
* 비동기 통신 그룹 설정 - (그룹 완료 및 전체 완료 확인 가능)

##### v0.0.3
* 구조 개선

##### v0.0.2
* 오류 수정

##### v0.0.1
* 플러그인 업로드