import $ from '../util/util';
import tpl from './productSelect.html';

let _productSelect = null;

function productSelect(number,selects=[],options = {}) {
    if (_productSelect) return _productSelect;

    options = $.extend({
        number:number,
        selects:selects,
        index:0,
        callback: $.noop,
        className: ''
    }, options);

    const $productSelectWrap= $($.render(tpl, options));
    const $productSelectMask=$productSelectWrap.find('.weui-mask');
    const $productSelect=$productSelectWrap.find('.weui-product-select');

    function _hide(callback){
        _hide = $.noop; // 防止二次调用导致报错
        _productSelect = null;

        $productSelect.addClass('weui-animate-slide-down');
        $productSelectMask
            .addClass('weui-animate-fade-out')
            .on('animationend webkitAnimationEnd', function () {
                $productSelectWrap.remove();
                _productSelect = false;
                callback && callback();
            });
    }
    function hide(callback){ _hide(callback); }

    $('body').append($productSelectWrap);

    $productSelectMask.addClass('weui-animate-fade-in').on('click', function () { hide(); });
    $productSelect.addClass('weui-animate-slide-up');

    //选项点击时间
    $productSelectWrap.find('.weui-product-select__item').on('click', '.select-option', function () {
        const index = $(this).index();
        options.index=index;

        const select=selects[index];
        $productSelectWrap.find('.weui-product-select__price').html('￥'+select.price);
        $productSelectWrap.find('.weui-product-select__stock').html(select.stock); 
        $productSelectWrap.find('.select-option').removeClass('standard-select-red');
        $productSelectWrap.find('.weui-product-select__src').attr({'src':select.thumb});
        //数量归1
        $productSelectWrap.find('.weui-product-select__count').val(1);
        //选项点击时回调
        options.optionback.call(this,select);
        $(this).addClass('standard-select-red');
    });
    //数量增加和减少
    const $productCount=$productSelectWrap.find('.weui-product-select__count');
    $productSelectWrap.on('click','.weui-product-select__add',function(){
        let select=selects[options.index];
        let $productCountVal=parseInt($productCount.val());
    
        $productCountVal=$productCountVal+1;
        if($productCountVal>select.stock){
            $productCountVal=select.stock;
        }
        $productCount.val($productCountVal);
    });
    $productSelectWrap.on('click','.weui-product-select__plus',function(){
        let $productCountVal=parseInt($productCount.val());
        
        $productCountVal=$productCountVal-1;
        if($productCountVal<2){
            $productCountVal=1;
        }
        $productCount.val($productCountVal);
    });

    //加入购物车
    $productSelectWrap.on('click','.weui-addin',function(){
        let select=selects[options.index];
        select.number=number;
        select.count=$productSelectWrap.find('.weui-product-select__count').val();

        options.buyback.call(this,select);
        hide();
    });

    _productSelect=$productSelectWrap[0];
    _productSelect.hide=hide;
    return _productSelect;
}
export default productSelect;
