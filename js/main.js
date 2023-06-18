var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
});


// 셀렉트 박스
const label = document.querySelectorAll('.label');
label.forEach(function(lb){
  // 라벨에 클릭 
    lb.addEventListener('click', e => {
        let optionList = lb.nextElementSibling;
        let optionItems = optionList.querySelectorAll('.optionItem');
        clickLabel(lb, optionItems);
    })
});
// 액티브 클래스 추가, 클릭 반복
const clickLabel = (lb, optionItems) => {
    if(lb.parentNode.classList.contains('active')) {
        lb.parentNode.classList.remove('active');
        optionItems.forEach((opt) => {
            opt.removeEventListener('click', () => {
                handleSelect(lb, opt)
            })
        })
    } else {
        lb.parentNode.classList.add('active');
        optionItems.forEach((opt) => {
            opt.addEventListener('click', () => {
                handleSelect(lb, opt)
            })
        })
    }
}
const handleSelect = (label, item) => {
    label.innerHTML = item.textContent;
    label.parentNode.classList.remove('active');
}


/* lnb */
(function($){
  
    var lnbUI = {
      click : function (target, speed) {
        var _self = this,
            $target = $(target);
        _self.speed = speed || 300;
        
        $target.each(function(){
          if(findChildren($(this))) {
            return;
          }
          $(this).addClass('noDepth');
        });
        
        function findChildren(obj) {
          return obj.find('> ul').length > 0;
        }
        
        $target.on('click','a', function(e){
            e.stopPropagation();
            var $this = $(this),
                $depthTarget = $this.next(),
                $siblings = $this.parent().siblings();
          
          $this.parent('li').find('ul li').removeClass('on');
          $siblings.removeClass('on');
          $siblings.find('ul').slideUp(250);
          
          if($depthTarget.css('display') == 'none') {
            _self.activeOn($this);
            $depthTarget.slideDown(_self.speed);
          } else {
            $depthTarget.slideUp(_self.speed);
            _self.activeOff($this);
          }
          
        })
        
      },
      activeOff : function($target) {
        $target.parent().removeClass('on');
      },
      activeOn : function($target) {
        $target.parent().addClass('on');
      }
    };
    
    // Call lnbUI
    $(function(){
      lnbUI.click('#lnb li', 300)
    });
    
  }(jQuery));
  