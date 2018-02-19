/*!
 * Multi-Ajax Loaded v0.0.7
 * Required library - jQuery
 * Author - CHEOLGUSO <https://cheolguso.com>
 * MIT License. <http://www.opensource.org/licenses/MIT>
 */

;(function($){
  "use strict";

  $.multiAjax = {};

  var _maec = {};
  _maec._maxSize = 0;
  _maec._totalLength = [];
  _maec._ajaxLength = {};
  _maec._successTime = 100;
  _maec._endErrTime = 30000;
  _maec._errTime = '';

  /**
   * 비동기 통신을 확인하는 배열에 임의의 값(0)을 추가합니다.
   *
   * @private
   * @since 0.0.1
   * @params id {String} 개별적인 비동기의 ID
   * @returns {Number} 비동기 통신을 확인하는 배열에 값을 추가합니다.
   */
  _maec._start = function(id) {
    this._maxSize++;
    this._totalLength.push(0);

    this._ajaxLength[id] = this._ajaxLength[id] ? this._ajaxLength[id] : [];
    this._ajaxLength[id].push(0);
  };

  /**
   * 비동기 통신을 확인하는 배열에 값 하나를 지웁니다. 모든 통신이 끝나면 완료 함수를 실행하며,
   * 지정된 시간안에 모든 통신이 끝나지 않으면 오류 함수를 실행합니다. (지정된 오류 대기 시간 기본값: 30000ms)
   *
   * @private
   * @since 0.0.1
   * @params id {String} 개별적인 비동기의 ID
   * @returns {Function | null} 지정된 시간 후 완료 또는 오류 함수를 리턴합니다.
   */
  _maec._end = function(id) {
    var _this = this;
    this._totalLength.pop();
    this._ajaxLength[id].pop();

    if(this._errTime) {
      clearTimeout(this._errTime);
    }
    this._errTime = setTimeout($.multiAjax.error, this._endErrTime);

    this.loadingPercent();

    setTimeout(function(_this){
      if(_this._ajaxLength[id].length === 0) {
        clearTimeout(_this._errTime);
        _this._success(id);
      }
      if(_this._totalLength.length === 0) {
        $.multiAjax.totalSuccess();
      }
    }(this), this._successTime);

  };

  /**
   * 그룹별로 비동기 통신이 정상적으로 끝났을때 실행할 함수를 지정합니다.
   *
   * @private
   * @since 0.0.1
   * @params id {String} 개별적인 비동기의 ID
   */
  _maec._success = function(id) {
    $.multiAjax[id] = $.multiAjax[id] ? $.multiAjax[id] : function() {};
    return $.multiAjax[id]();
  };

  /**
   * 비동기통신 하나가 끝날때 마다 진행률을 $.multiAjax.percentage에 캐시합니다.
   *
   * @private
   * @since 0.0.1
   * @returns {Function} 비동기 통신 진행률
   */
  _maec.loadingPercent = function() {
    var totalSize = _maec._maxSize,
      nowSize = _maec._totalLength.length;

    $.multiAjax.percentage = parseInt(100 - (nowSize * 100 / totalSize));
  };

  /**
   * 비동기 통신 진행률이 퍼센트로 입력됩니다.
   *
   * @static
   * @since 0.0.1
   */
  $.multiAjax.percentage = 0;

  /**
   * 비동기 통신 하나가 새롭게 시작되었음을 확인합니다.
   *
   * @static
   * @since 0.0.1
   * @params id {String} 개별적인 비동기의 ID
   * @returns {Number} 비동기 통신 확인
   */
  $.multiAjax.start = function(id) {
    return _maec._start(id);
  };

  /**
   * 비동기통신 하나가 끝났음을 확인합니다.
   *
   * @static
   * @since 0.0.1
   * @params id {String} 개별적인 비동기의 ID
   * @returns {Function} 비동기 통신 종료 확인
   */
  $.multiAjax.end = function(id) {
    return _maec._end(id);
  };

  /**
   * 모든 비동기 통신이 정상적으로 끝났을때 실행할 함수를 지정합니다.
   *
   * @static
   * @since 0.0.1
   */
  $.multiAjax.totalSuccess = function() {};

  /**
   * 지정된 시간안에(기본값: 30000ms) 끝나지 않을시 실행할 함수를 지정합니다.
   *
   * @static
   * @since 0.0.1
   */
  $.multiAjax.error = function() {};

})(jQuery);