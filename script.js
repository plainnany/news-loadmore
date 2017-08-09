$(function(){
    var index = 0
    var isOver = false
    var isNewsArrive = true
    let hasNext = true
    getNews()
    $(window).on('scroll',function(){
        if(isVisible($('.loadmore')) && !isOver && isNewsArrive){
            getNews()
        }
        
    })
    
    
    
    function getNews(){
        isNewsArrive = false
        
        console.log(index)
        if(!hasNext){return}
        $.get('./data'+ (index) +'.json').done(function(res){
            index++
            isNewsArrive = true      
            appendHtml(res)
            if(isVisible($('.loadmore'))){
                getNews()
            }
            $('.news img[data-src]').each(function(){
                if(!$(this).attr('src')){
                    $(this).attr('src',$(this).attr('data-src'))
                }
            })
            
            if(!res.hasNextPage){
                $('.loadmore').text('没有更多的数据了')
                hasNext = false    // 判断是否有下一页，如果没有，直接return
                isOver = true
            }

        }).fail(function(){
            alert('error')
        })
        
    }
    function isVisible(element){
        let scrollTop = $(window).scrollTop()
        let elementTop = $(element).offset().top
        let windowHeight = $(window).height()
        let elementHeight = $(element).height()
        if(elementTop>scrollTop-elementHeight && elementTop<scrollTop+windowHeight){
            return true
        }else{
            return false
        }
    }
    function appendHtml(data){
        let html = ''
        for(let i = 0;i < data.content.length;i++){
            html += '<li class="item">\
            <a href='+ data.content[i].link +'></a><img data-src='+ data.content[i].img +' alt="">\
            <h3>'+ data.content[i].title +'</h3><p>'+ data.content[i].brif +'</p>\
            </li>'
        } 
        
        $('.news').append(html)
    }
    
})