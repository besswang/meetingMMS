/**
 * Created by wanglijuan on 2016/12/2.
 */
// var telColor;
//面向对象
function Person(name,tel,speaked,status) {//构造函数：用来构造一个对象
    //假象的系统内部工作流程；
    // var this=new Object();自动创建；
    this.name = name;
    this.tel = tel;
    this.speaked = speaked;
    this.status = status;
    //假象的系统内部工作流程；
    //return this;自动返回
}

Person.prototype.speakedFn = function () {
    var str = "";
    if(this.speaked == 0){
        str = "发言";
    }else if(this.speaked == 1){
        str = "禁言"
    }
    return str;
};
Person.prototype.statusFn = function () {
    var str = '';
    switch (this.status){
        //1，函数
        case 1:
            str = "未连接";
            break;
        case 2:
            str = "连接中";
            break;
        //3，对象
        case 3:
            str = "加入会议";
            break;
        case 4:
            str = "退出会议";
            break;
        case 5:
            str = "被移除";
            break;
        case 6:
            str = "结束会议";
    }
    return str
};
Person.prototype.clickFn = function () {
        console.log("3344");
};
Person.prototype.statusFn = function () {
    var str = '';
    switch (this.status){
        //1，函数
        case 1:
            str = "未连接";
            break;
        case 2:
            str = "连接中";
            break;
        //3，对象
        case 3:
            str = "加入会议";
            break;
        case 4:
            str = "退出会议";
            break;
        case 5:
            str = "被移除";
            break;
        case 6:
            str = "结束会议";
    }
    return str
};
// var c1 = new Person();
// c1.statusFn();
// // console.log(c1);
// // c1.speakedFn();
// // c1.statusFn();
// $('body').click(function () {
//     var a = c1.statusFn();
//     console.log(a)
// });

// var a = new Person();
// $('body').click(function () {
//     a.onclick();
// });




$(function () {
    $.fn.fadeInWithDelay = function(){
        var delay = 0;
        return this.each(function(){
            $(this).delay(delay).animate({opacity:1}, 200);
            delay += 100;
        });
    };
    //登陆后请求数据
    // $.ajax({
    //     url:"http://111.11.183.124:8012/pc%20/login.htm",
    //     type: "POST",
    //     dataType :"json",
    //     data:{
    //         fixPhone:"18767173166",
    //         password:"123456"
    //     },
    //     success	:function(data){
    //         console.log(data);
    //     },
    //     error:function(data){
    //
    //     }
    // });
    //左边人员
    // var itemUl = document.getElementById("select2-choices");
    // var itemli = itemUl.getElementsByTagName("li");
    //右边部门和人员
    // var departmentGroup = document.getElementById("departmentGroup");
    // var itemli2 = departmentGroup.getElementsByTagName("li");
    //配置消息框参数
    toastr.options = {
        closeButton: false,
        debug: false,
        progressBar: false,
        positionClass: "toast-top-center",
        onclick: null,
        showDuration: "300",//显示动作（从无到有这个动作）持续的时间
        hideDuration: "500",
        timeOut: "1000",//间隔的时间
        extendedTimeOut: "800",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut"
    };
    //菊花加载
    function showSpin(id){
        var spinnerOpts = {
                lines: 11 // 共有几条线组成
                , length: 13 // 每条线的长度
                , width: 8 // 每条线的长度
                , radius: 19 // 内圈的大小
                , scale: 0.5 // Scales overall size of the spinner
                , corners: 0.1 // 圆角的程度
                , color: '#000' // #rgb or #rrggbb or array of colors
                , opacity: 0.1 // Opacity of the lines
                , rotate: 18 // 整体的角度（因为是个环形的，所以角度变不变其实都差不多）
                , direction: 1 // 1: clockwise, -1: counterclockwise
                , speed: 0.8 // 速度：每秒的圈数
                , trail: 55 //  高亮尾巴的长度
                , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
                , zIndex: 2e9 // z-index的值 2e9（默认为2000000000
                , className: 'spinner' // The CSS class to assign to the spinner
                , top: '50%' // Top position relative to parent
                , left: '50%' // Left position relative to parent
                , shadow: false // 是否要阴影
                , hwaccel: false // 是否用硬件加速
                , position: 'absolute' // Element positioning
        };
        var spinTarget = document.getElementById(id);
        new Spinner(spinnerOpts).spin(spinTarget);
    }
    var page = 1;
    var total;
    var pageSize = 10;
    var maxPage;
    function addrecordId(recordid){
        $.ajax({
            url: 'findById.json',
            type: 'GET',
            async:true,//是否异步
            dataType: 'json',
            timeout: 1000,
            cache: false,
            data:{
                recordid:recordid//部门id
            },
            beforeSend: function () {
                showSpin("conRight");
            },
            success:function (data) {

                var html = "";
                $(".member-grounp").html("");
                $(".member").show();
                $(".emptyI").hide();

                var members = data.members;
                var member2 = [];//可以把筛选后的对象存入数组中;
                for(var j=0;j<members.length;j++){
                    if(members[j].isHost == 1){
                        member2 = members[j];
                        members.splice(j,1);
                        break;
                    }
                }
                // console.log(members);
                // console.log(member2);
                $(".host-icon").text(member2.fixName.slice(-2));
                $(".host-icon").css("background-color",telColor(member2.phone));
                $(".host").text("主持人:" + member2.fixName);
                var a;
                var b;
                $.each(members,function (i,item) {

                    a = new Person(item.fixName,item.phone,item.speaked,item.status);
                    b = a.clickFn();
                    // console.log(b);
                    var num = item.phone;
                    // data-departId=' + o.departId + '
                    html += '<li data-tel=' + item.phone + ' data-tel=' + item.memberId + '>' +
                        // '<span class="m-icon" style="background-color:rgb'+$.trim(bg)+'">' + o.name.slice(-2) + '</span>' +
                        '<span class="m-icon" style="background-color:'+telColor(num)+'">' + item.fixName.slice(-2) + '</span>' +
                        '<p class="name">' + item.fixName + '</p>' +
                        '</li>';
                });
                // console.log(b);//[Person, Person]
                html +=
                    '<li class="addBtn" id="addBtn" data-toggle="modal" data-target="#myModal">' +
                    '<span class="addI">' + '</span>' +
                    '</li>' + '</ul>';
                $(".member-grounp").append(html);
                //点击加号，把人员在添加到模态窗中，做已有数据到修改
                // $("#addBtn").click(function () {
                //     $.each(otem, function (i, o) {
                //         addselect2(o.name,o.tel,o.departId,null,true); //姓名，电话号码,部门id,人员id,chbox状态
                //     });
                //
                //     smscount();
                // })
                $(".member-grounp").on('li',function () {
                    console.log("444");
                })
            },//success
            complete: function () {
                $(".spinner").hide();
            }
        });
    }
    var a=2;
    $(".has-meeting-record").on('click',function () {
        addrecordId(a);
        $(".state1").hide();
        $(".w280").show();
        $(".w280").css("bottom","0");
    });
    function ajaxPage(page) {//ajaxPage(page,pageSize,fixPhone);
        $.ajax({
            url: 'findByPage.json',
            type: 'GET',
            async:false,//是否异步
            dataType: 'json',
            timeout: 1000,
            cache: false,
            data:{
                page:page,//当前页数
                fixPhone:fixPhone
                // pageSize:10//每页条数
                // fixPhone:fixPhone,//登陆的固话号码
                // maxPage: function () {
                //         var total = 0;//总页数
                //         if(total%pageSize == 0){//当总数据除以每页数据个数 余数为0的时候
                //             maxPage = total/pageSize;
                //         }else{
                //             maxPage = parseInt(total/pageSize)+1;
                //         }
                // }//最大的页数，也就是滚动多少次停
            },
            beforeSend: LoadFunction, //加载执行方法
            error: erryFunction,  //错误执行方法
            success: succFunction, //成功执行方法
            complete:completeFunction
        });
        function LoadFunction() {
            //			$("#meeting-record").html('加载中...');
            showSpin("main");
        }
        function erryFunction() {
            alert("error");
        }
        function succFunction(data) {
            var html;
            total = data.data.total;
            if (total % pageSize == 0) {//当总数据除以每页数据个数 余数为0的时候
                maxPage = total / pageSize;
            } else {
                maxPage = parseInt(total / pageSize) + 1;
            }
            $(".ajaxtips").hide();//隐藏加载提示
            //			$("#meeting-record").append(data);//把新的内容加载到内容的后面
            //清空
            $.each(data.data.dtos, function (i,item) {//循环获取数据
                html =
                    '<li style="opacity:0;-moz-opacity: 0;filter: alpha(opacity=0);">'+
                    '<div class="three-icon">';
                    $.each(item.members,function (i,v) {
                        html+=
                            '<span style="background-color:'+telColor(v.phone)+'" class="small-icon">'+v.fixName.slice(-2)+'</span>';
                    });
                html +=
                    '</div>'+
                    '<div class="right-cont">'+
                    '<p>'+
                    '<span class="content">'+item.meetTitle+'</span>'+
                    '<span class="time">'+item.startTime+'</span>'+
                    '<a class="reservation" data-recordType='+item.recordType+' href="#"></a>'+
                    '</p>'+
                    '</div>'+
                    '</li>';
                $(".has-meeting-record").append(html);
            });
            $(".has-meeting-record li").fadeInWithDelay();
            //			会议状态
            $("[data-recordType]").each(function () {
                var state = $(this).attr("data-recordType");
                if(state ==1){
                    $(this).text("");
                }else if(state == 2){
                    $(this).text("预约会议");
                }
            });
            //			会议时间
            stop = true;//加载开关
        }
        function completeFunction() {
            $(".spinner").hide();
        }
    }
    var meetscroll = document.getElementById("meetscroll");
    var stop = true;//触发开关，防止多次调用事件
    $(".has-meeting-record").html('');//先清空
    ajaxPage(page)//ajaxPage(page,pageSize,fixPhone);
	$("#meetscroll").on('scroll',function () {
		console.log($("#meetscroll").scrollTop());
	})
	var nScrollHight = 20; //滚动距离总长(注意不是滚动条的长度)
	var nScrollTop = 0;   //滚动到的当前位置
	var nDivHight = $("#meetscroll").height();
	meetscroll.onscroll = function () {
		nScrollHight = $(this)[0].scrollHeight;
		nScrollTop = $(this)[0].scrollTop;
		var paddingBottom = parseInt( $(this).css('padding-bottom') ),paddingTop = parseInt( $(this).css('padding-top') );
		if(nScrollTop + paddingBottom + paddingTop + nDivHight >= nScrollHight){
			if (stop == true) {
				stop = false;
				page = page + 1;//当前要加载的页码；
//				if(page<=maxPage){当加载页码等于总页数当时候，停止加载
				//加载提示信息
				$("#meeting-record").append("<ul class='ajaxtips'><li>加载.....</li></ul>");
				ajaxPage();//ajaxPage(page,pageSize,fixPhone);
//				}else{
//					meetscroll.onscroll=null;
//				}
			}
		}
	};
    function maxPageNum() {
        if (total % pageSize == 0) {//当总数据除以每页数据个数 余数为0的时候
            maxPage = total / pageSize;
        } else {
            maxPage = parseInt(total / pageSize) + 1;
        }
    }
    maxPageNum();
    //注册滚动条事件
    // scrollBottomTest =function(){
        $("#meetscroll").scroll(function(){

            var $this =$(this),
                viewH =$this.height(),//可见高度
                contentH =$this.get(0).scrollHeight,//内容高度
                scrollTop =$this.scrollTop();//滚动高度
            console.log(scrollTop);
            if(contentH - viewH - scrollTop <= 20) { //到达底部100px时,加载新内容
                //内容的高度-视窗的高度-隐藏的高度
                if (stop == true) {
                        page++;//当前要加载的页码；
                    if(page <= maxPage){ //当加载页码等于总页数当时候，停止加载
                        //加载提示信息
                        $("#meeting-record").append("<ul class='ajaxtips'><li>加载.....</li></ul>");
                        // $(".has-meeting-record").append('<li>加载.....</li>');
                        ajaxPage(page);
                        stop = false;
                    }else{
                        meetscroll.onscroll=null;
                        // $("#meeting-record").html("");
                        // $("#meeting-record").append("<ul class='ajaxtips'><li>加载.....</li></ul>");
                        // $("#meeting-record").css("padding-bottom","100px");
                    }
                }
            }
        });
    // };
    // scrollBottomTest();
    //	发起电话会议---搜索
    //定义一些数据
//	var data = ["15057187176", "15057187175", "15057187174", "15057187173", "武林江湖", "will"];
    var ele_key = document.getElementById("member-phone");
    $('.isearchSug').bind('keypress',function(event){
        //       if(event.keyCode == "13"){
        //          doSearch();
        //      }
    });
    var ele_datalist = document.getElementById("search-member-list");
    var memberPhone = document.getElementById("member-phone");
    // ele_key.onfocus = function () {//当激活时
    memberPhone.onclick = function () {
        $.ajax({
            // url: '/material/list?type=1&pageSize=10&pageNo='+ pageNo,
            url:"department2.json",
            type: 'GET',
            dataType: 'json',
            timeout: 1000,
            cache: false,
            // data:{
            //     companyId:"2446"
            // },
            success:function (data) {
                var html="";
                $("#search-member-list").html("");
                ele_datalist.style.visibility = "visible";
                $.each(data.data.departPhones,function (i,v) {
                    // <li data-id="4">
                    //     <a href="https://twitter.com/GLindqvist" class="link name">Gustaf Lindqvist</a>
                    // <p class="born timestamp" data-timestamp="45678">1983</p>
                    //     <img class="image" src="boba.jpeg">
                    // </li>
                    html +=
                        '<li class="member-li-sub" data-id='+v.id+'>'+
                        '<span class="sub-icon circle30" style="background-color:'+telColor(v.fixPhone)+'">'+v.phoneName.slice(-2)+'</span>'+
                        '<div class="sub-name-tel">'+

                        '<b class="name">'+v.phoneName+'</b>'+'<br>'+
                        '<small class="tel">'+v.fixPhone+'</small>'+

                        '<i class="pinyin" style="display:none;">'+v.pinyin+'</i>'+
                        '</div>'+
                        '<span class="sub-job position">'+v.departName+'</span>'+
                        '</li>';

                });
                $("#search-member-list").append(html);
                var options = {
                    valueNames: [
                        'name',//名字
                        'tel',//号码
                        'position',//职位
                        'pinyin',//拼音
                        // { data: ['id'] },
                        // { attr: 'data-name', name: 'djld' },
                        'circle30'
                        // { attr: 'data-timestamp', name: 'timestamp' }
                    ],
                    page:10
                    // page: 3,
                    // plugins: [
                    //     ListPagination({})
                    // ]
                };
                var userList = new List('users', options);
                //做添加
                userList.add({name: '看反馈', tel: '1954', position: '测试', pinyin: 'xiaoxiao',circle30:'反馈'});

                console.log(userList);
                // $.each(userList.options,function (i,item) {
                //     console.log(item[name]);
                // });
                console.log(userList.name);

                //失去焦点
                // ele_key.onblur = function () {
                //     if(ele_datalist.style.visibility == "visible"){

                //     }
                // };
                $(document).on("click", function(ev){
                    var ev = ev||event;
                    ele_datalist.style.visibility = "hidden";
                    ev.stopPropagation();
                });

            }
        });
        // var val = this.value;
        // ajaxSearch(val);
    };

    $("#search-member-list").on('click',"li",function () {
        //输入框清空
        $("#member-phone").val("");
        var text = $(this).children().children("b").text();
        var tel = $(this).children().children("small").text();
        var oid = $(this).attr("data-id");
        // var index = $(this).index();
        console.log($(this).children().children("b").text());

        var itemUl = document.getElementById("select2-choices");
        var itemli = itemUl.getElementsByTagName("li");
        if(itemli){
            for(var i=0;i<itemli.length;i++){
                //判断手机号
                if(tel == $(itemli[i]).attr("title")){
                    toastr.info("不能重复选择！");
                    return false;
                }
            }
        }
        addselect2(text,tel,null,oid,true);
        smscount();
        ele_datalist.style.visibility = "hidden";
        // userList.remove();
        // userList.clear();

        // var arrayWithManyManyItems = ["a","b","c"];
        // userList.add(arrayWithManyManyItems, function(items) {
        //     console.log('All ' + items.length + ' were added!');
        // });

        // var a = userList.get("name");//[ ]
        // console.log(a)

    });

//      ele_key.onkeyup = function (ev) {//当输入时
//         var ev = ev||event;
//          var val = this.value.toLowerCase();
//          //这里注意（汉字，拼音【大小写】，号码）作为搜索内容
//          console.log(val);
// //         if(ev.keyCode == "13"){
// //             // doSearch();
// //             console.log("888");
// //             addselect2(val);
// //         }
// //         if(event.keyCode == 38){
// //             console.log("38");
// //             // to_left();
// //         }else if (event.keyCode == 40){
// //             console.log("40");
// //             // to_right();
// //         }
// //         // $.ajax({
// //         //     url: '/material/list?type=1&pageSize=10&pageNo='+ pageNo,
// //         //     type: 'GET',
// //         //     dataType: 'json',
// //         //     timeout: 1000,
// //         //     cache: false,
// //         //     data:{
// //         //         companyId:"2446"
// //         //     },
// //         //     success: function(data) {
// //         //         var html = '';
// //         //
// //         //         for(var i=0; i<data.total; i++) {
// //         //             html += '<div></div>';
// //         //         }
// //         //         $('#itemContainer').append(html);
// //         //
// //         //         html = '';
// //         //
// //         //         for(var i=0; i<data.list.length; i++) {
// //         //             html += '<img src="/'+ data.list[i].Path +'">';
// //         //         }
// //         //         $('.imgContainer').empty().append(html);
// //         //
// //         //         $('.holder').jPages({
// //         //             containerID: 'itemContainer',
// //         //             perPage: 10,
// //         //             callback: function(pages, items) {
// //         //                 $.ajax({
// //         //                     url: '/material/list?type=1&pageSize=20&pageNo='+ pages.current,
// //         //                     success: function(data) {
// //         //                         var html = '';
// //         //
// //         //                         for(var i=0; i<data.list.length; i++) {
// //         //                             html += '<img src="/'+ data.list[i].Path +'">';
// //         //                         }
// //         //                         $('.imgContainer').empty().append(html);
// //         //                     },
// //         //                 });
// //         //             },
// //         //         });
// //         //     },
// //         // })
// // //		var ele_datalist = document.getElementById("search-member-list");
// // //		ele_datalist.style.visibility = "visible";
// // //		console.log(val);
// // //		if(val==""){
// // //			ele_datalist.style.visibility = "visible";
// // //			return false;
// // //		}
// //         //获取输入框里匹配的数据
// //         ajaxSearch(val);
//     };



    // function upperCase(x){//(this.id)
    //     console.log(x);
    //     var val = document.getElementById(x).value;
    //     // document.getElementById(x).value=y.toUpperCase()
    //     ajaxSearch(val);
    // }


    function ajaxSearch(val) {
//		获取到的数据准备追加显示；
        var ele_datalist = document.getElementById("search-member-list");
        ele_datalist.style.visibility = "visible";
        if(val){
            $.ajax({
                url: 'searchdata.json',
                type: 'GET',
                dataType: 'json',
                timeout: 1000,
                cache: false,
                // data:{
                //     companyId:"2446"
                // },
                data:{
                    searchKey:val
                },
                success:function (data) {
                    //前期要做的事情: 清空数据,然后显示数据列表
                    ele_datalist.innerHTML = "";
                    for (var i = 0; i < data.data.length; i++) {
                        var expend = data.data[i].expand;
                        var phoneName = data.data[i].phoneName;
                        var departName = data.data[i].departName;
                        var fixPhone = data.data[i].fixPhone;
                        expend = expend.split(",");
                        expend.unshift(fixPhone);//组合数组开头
                        //如果获取到的数据为空,则不显示
                        if (expend.length == 0) {
                            ele_datalist.style.visibility = "hidden";
                        }
                        for(var k=0;k<expend.length;k++){
                            $("#search-member-list").append(
                                '<li class="member-li-sub">'+
                                '<span class="sub-icon circle30" style="background-color:'+telColor(expend[k])+'">'+phoneName.slice(-2)+'</span>'+
                                '<div class="sub-name-tel">'+
                                '<b>'+phoneName+'</b>'+'<br>'+
                                '<small>'+expend[k]+'</small>'+
                                '</div>'+
                                '<span class="sub-job">'+departName+'</span>'+
                                '</li>'
                            )
                        }

                        //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。检索val
//						if (val.trim().length > 0 && data.data[i].indexOf(val) > -1) {//val.trim()两端去空格处理
//							//如果要检索的字符串值没有出现，则该方法返回 -1。
//							srdata.push(data.data[i]);
//							console.log(srdata);
//						}
                    }
                    var memberLi = ele_datalist.getElementsByTagName("li");
                    //2.然后每一行加入点击事件
                    for(var j= 0;j<memberLi.length;j++){
                        memberLi[j].index = j;
                        memberLi[j].onclick = function () {
                            //3.点击后将数据放入搜索框内
                            var text = this.childNodes[1].childNodes[0].textContent;
                            var tel = this.childNodes[1].childNodes[2].textContent;//因为有个br，所以是2
                            //判断搜索中的号码和选定的号码是否重复
                            var select2Choices = document.getElementById("select2-choices");
                            var select2ChoicesLi = select2Choices.getElementsByTagName("li");
                            for(var q=0;q<select2ChoicesLi.length;q++){
                                if(tel == select2ChoicesLi[q].getAttribute("title")){
                                    toastr.info("不能重复选择！");
                                    return false;
                                }
                            }
                            addselect2(text,tel);
                            //4.数据列表隐藏并清空搜索框内容
                            ele_datalist.style.visibility = "hidden";
                            ele_key.value = "";
                            //0/500人
                            smscount();
                        }
                    }
                }//success
            })
        }else{//当搜索框倒退为空的时候，隐藏搜索列表;
            ele_datalist.style.visibility = "hidden";
        }
    }

    // function checkState() {
    //     var itemUl = document.getElementById("select2-choices");
    //     var itemli = itemUl.getElementsByTagName("li");
    //     if(itemli){
    //         for(var i=0;i<itemli.length;i++){
    //             var currentLi = $(itemli[i]);
    //             var departmentGroup = document.getElementById("departmentGroup");
    //             var itemli2 = departmentGroup.getElementsByTagName("li");
    //             if($(this).prop("data-checkbox",true)){
    //                 if(itemli2){
    //                     for(var j=0 ;j<itemli2.length;j++){
    //                         if($(itemli2[j]).attr("data-phonevalue") == currentLi.attr("title")){
    //                             $(itemli2[j]).find("input[name='subBox']").prop("checked",true);
    //                         }
    //                         var $subBox = $("input[name='subBox']");
    //                         $("#checkAll").prop("checked",$subBox.length == $("input[name='subBox']:checked").length ? true : false);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    //保存选中状态
    function checkState() {
        var oItem = $("#select2-choices").children();
        var oDepart = $("#departmentGroup").children();
        oItem.each(function () {
            var _this = $(this);
            if(_this.prop("data-checkbox",true)){//左边的data-checkbox,传参为true
                oDepart.each(function () {//遍历右边
                    if($(this).attr("data-phonevalue") == _this.attr("title")){
                        $(this).find("input[name='subBox']").prop("checked",true);
                    }
                    var $subBox = $("input[name='subBox']");
                    $("#checkAll").prop("checked",$subBox.length == $("input[name='subBox']:checked").length ? true : false);
                })
            }
        });
    }
//	发起电话会议---搜索end
    function addselect2(text,expend,departId,memberid,checkbox) {//姓名，电话号码,部门id,人员id,chbox状态
        $("#select2-choices").append(
            '<li class="select2-search-choice" data-text='+text+' title='+expend+' data-departId='+departId+' data-id='+memberid+' data-checkbox='+checkbox+'>'+
            '<span>'+text+'</span>'+
            '<a href="#" class="select2-search-choice-close"></a>'+
            '</li>'
        );
        checkState();
        $("#select2-choices").on("click","li a",function(e){
            // console.log($(e.target).children("a"));
            $(e.target).css("background-color","#ddd").siblings().css("background-color","white");
            var currentLi = $(e.target).parent();
            $(currentLi).attr("data-checkbox",false);
            var departmentGroup = document.getElementById("departmentGroup");
            var itemli2 = departmentGroup.getElementsByTagName("li");
            if($(currentLi).prop("data-checkbox",false)){
                if(itemli2){
                    for(var j=0 ;j<itemli2.length;j++){
                        if($(itemli2[j]).attr("data-phonevalue") == currentLi.attr("title")){
                            $(itemli2[j]).find("input[name='subBox']").prop("checked",false);
                        }
                        var $subBox = $("input[name='subBox']");
                        $("#checkAll").prop("checked",$subBox.length == $("input[name='subBox']:checked").length ? true : false);
                    }
                }
            }
            currentLi.remove();
            smscount();
        });
        //添加人的时候，右边的复选框的状态


            // if(checkbox == true){
            //     var currentLi = $("#select2-choices li");
            //     var departmentGroup = document.getElementById("departmentGroup");
            //     var itemli2 = departmentGroup.getElementsByTagName("li");
            //     if(itemli2){
            //         for(var j=0 ;j<itemli2.length;j++){
            //             if($(itemli2[j]).attr("data-phonevalue") == currentLi.attr("title")){
            //                 $(itemli2[j]).find("input[name='subBox']").prop("checked",true);
            //             }
            //             var $subBox = $("input[name='subBox']");
            //             $("#checkAll").prop("checked",$subBox.length == $("input[name='subBox']:checked").length ? true : false);
            //         }
            //     }
            // }
        //删除人员

        // $("#select2-choices .select2-search-choice .select2-search-choice-close").click(function () {
        //     var currentLi = $(this).parent();
        //     var departmentGroup = document.getElementById("departmentGroup");
        //     var itemli2 = departmentGroup.getElementsByTagName("li");
        //     if(itemli2){
        //         for(var j=0 ;j<itemli2.length;j++){
        //             if($(itemli2[j]).attr("data-id") == currentLi.attr("data-id")){
        //                 $(itemli2[j]).find("input[name='subBox']").prop("checked",false);
        //             }
        //             var $subBox = $("input[name='subBox']");
        //             $("#checkAll").prop("checked",$subBox.length == $("input[name='subBox']:checked").length ? true : false);
        //         }
        //     }
        //     currentLi.remove();
        //     smscount();
        // });
    }
//	选人统计0/500人
    function smscount() {
        var select2Choices=document.getElementById("select2-choices");
        var select2ChoicesLi=select2Choices.getElementsByTagName("li");
        var length = select2ChoicesLi.length;
        if (length > 501) {
            $(".select-user-count").text("已选："+(length-1)+"/500人");
            toastr.info("不能超过500人！");
        } else {
            $(".select-user-count").text("已选："+length+"/500人");
        }
    }
    //弹出打开
    $('#myModal').on('shown.bs.modal',department());//modal

    // function titlefun(title) {//这里传入的参数是一个数组["公司名称","一级部门","二级部门"]
    //     $(".breadcrumb").html("");
    //     for(var w=0;w<title.length;w++){
    //         $(".breadcrumb").append(
    //             '<a href="#">&gt;'+title[w]+'</a>'
    //         )
    //     }
    //     var str = $(".breadcrumb a:eq(0)").text();
    //     strs=str.substring(1)//字符分割，第一个title去&gt
    //     $(".breadcrumb a:eq(0)").text(strs);
    //     $(".breadcrumb a:eq(0)").on('click',function () {
    //         refresh(id)
    //     });
    // }

    function titlefun(titleid,title) {//这里传入的参数是一个数组["公司名称","一级部门","二级部门"]
        // $(".breadcrumb").html("");
        var titleAll = [];
        var obj = {id:titleid,name:title};
        // var t = arrayToJson(obj);
        // console.log(obj);
        titleAll.push(obj);
        console.log(titleAll);
        $.each(titleAll,function (i,v) {
            $(".breadcrumb").append(
                '<a href="#" data-titleId='+v.id+'>&gt;'+v.name+'</a>'
            )
        });
    }
    $(".breadcrumb").on('click',"a",function () {
        refresh($(this).attr('data-titleId'),$(this).text());
    });

    function  refresh(id,name) {
        $(".breadcrumb").html("");
        if(id==companyId){
            department();
        }else{
            departmentSub(id,name);
        }
    }
    function department() {//公司的，或者部门的
        // $(".member-checkAll").hide();
        var departmentGroup = document.getElementById("departmentGroup");
        titlefun(companyId,companyName);
        var str = $(".breadcrumb a:eq(0)").text();
        strs=str.substring(1)//字符分割，第一个title去&gt
        $(".breadcrumb a:eq(0)").text(strs);
        departmentAjax();
    }//department()
    function departmentAjax() {
        $.ajax({
            url: 'getList.json',
            type: 'GET',
            dataType: 'json',
            timeout: 1000,
            cache: false,
            data:{
                departId:"0"
            },
            // beforeSend: function(XMLHttpRequest){
            //     var target = document.getElementById("departmentGroup");
            //     var spinner = new Spinner(spinnerOpts).spin(target);
            // },
            beforeSend: function () {
                showSpin("main");
            },
            success:function (data) {
                //前期要做的事情: 清空数据,然后显示数据列表
                departmentGroup.innerHTML = "";
                var html="";
                html =
                    '<li>'+
                    '<div class="member-checkAll">'+
                    '<input type="checkbox" id="checkAll" name="checkAll" data-titleId='+companyId+'>'+
                    '<label for="checkAll">'+"全选"+'</label>'+
                    '</div>'+
                    '<li>';
                $("#departmentGroup").append(html);
                $.each(data.data.childDeparts, function (i,item) {//循环获取数据
                    $("#departmentGroup").append(
                        '<li class="department" data-departId='+item.departId+'>'+
                        '<p class="department-title">'+item.departName+'</p>'+
                        '<span class="count">'+item.phoneCount+"人"+'</span>'+
                        '</li>'
                    );
                });
                $.each(data.data.departPhones, function (i,item) {//循环获取数据
                    html =
                        '<li class="member-li-sub department-li" data-departId = '+item.departId+' data-id='+item.id+' data-phonevalue='+item.fixPhone+' data-name='+item.phoneName+'>'+
                        '<div class="clearfix">'+
                        '<label>'+
                        '<input name="subBox" type="checkbox" class="member-radio">'+
                        '<span class="sub-icon circle30" style="background-color:'+telColor(item.fixPhone)+'">'+item.phoneName.slice(-2)+'</span>'+
                        '<div class="sub-name-tel" data-fixPhone='+item.fixPhone+'>'+item.phoneName+'</div>'+
                        '</label>'+
                        '</div>'+
                        '<dl class="more-phone-ul">'+
                        '<dd class="more-phone-li" data-num='+item.fixPhone+'>'+
                        '<label>'+
                        '<input type="radio" name='+i+' class="member-sub-radio" checked>'+
                        '<small>'+item.fixPhone+'</small>'+
                        '</label>'+
                        '</dd>';
                    var expandArr = item.expand.split(',');
                    $.each(expandArr, function (j, expand) {
                        if(expandArr != ""){
                            html +=
                                '<dd class="more-phone-li" data-num='+expand+'>' +
                                '<label>' +
                                '<input type="radio" name='+i+' class="member-sub-radio">' +
                                '<small>' + expand + '</small>' +
                                '</label>' +
                                '</dd>'
                        }
                    });
                    html += '</dl>'+'</li>';
                    $("#departmentGroup").append(html);
                });//each
                checkState();
                var oSubBox = document.getElementsByName("subBox");
                var oCheckAll = document.getElementById("checkAll");
                checkAll(oCheckAll,oSubBox);
                var $subBox = $("input[name='subBox']");
                $subBox.click(function(){
                    $("#checkAll").prop("checked",$subBox.length == $("input[name='subBox']:checked").length ? true : false);
                });
                $("#checkAll").change(function () {
                    if($("#checkAll").prop("checked")){
                        $.each(data.data.departPhones,function (i,item) {
                            checkAllAdd(item);
                        });
                        smscount();
                    }else{
                        $.each(data.data.departPhones,function (i,item) {
                            checkAllCut(item)
                        });
                        smscount();
                    }
                });
                $subBox.change(function () {
                    var currentLi = $(this).parent().parent().parent();
                    var itemUl = document.getElementById("select2-choices");
                    var itemli = itemUl.getElementsByTagName("li");
                    if($(this).prop("checked")){
                        addselect2(currentLi.attr("data-name"),currentLi.attr("data-phonevalue"),currentLi.attr("data-departid"),currentLi.attr("data-id"),true);
                        smscount();
                    }else{
                        //删除已选成员
                        for(var i = 0; i<itemli.length; i++){
                            if(currentLi.attr("data-name") == $(itemli[i]).attr("data-text") && currentLi.attr("data-phonevalue") == $(itemli[i]).attr("title")){
                                $(itemli[i]).remove();
                            }
                        }
                        smscount();
                    }
                });
            },//success
            complete: function () {
                $(".spinner").hide();
            }
        })
    }
    $("#departmentGroup").on('click','.department',function () {
        var departId = $(this).attr("data-departId");
        var departName = $(this).children('p').text();
        departmentSub(departId,departName);
    });
    function departmentSub(departId,departName){//通过部门id，添加部门成员
        titlefun(departId,departName);
        var departmentGroup = document.getElementById("departmentGroup");
        // var titleAll = [companyName];
        // titlefun(titleAll);
        // var departId = $(this).attr("data-departId");
        // var departId = $("#departmentGroup .department").attr("data-departId");
        //查看遍历左边的checkbox为true的时间
        $.ajax({
            url:'department2.json',
            type:'GET',
            dataType:'json',
            timeout:1000,
            cache:false,
            data:{
                departId:departId,
                departName:departName
            },
            beforeSend: function () {
                showSpin("main");
            },
            success:function (data) {
                if(departId == data.data.departId){
                    // 前期要做的事情: 清空数据,然后显示数据列表
                    departmentGroup.innerHTML = "";
                    // titleAll.push(data.data.departName);
                    // titlefun(titleAll);//列表的头部

                    var html ="";
                    html =
                        '<li>'+
                        '<div class="member-checkAll">'+
                        '<input type="checkbox" id="checkAll" name="checkAll" data-titleId='+departId+'>'+
                        '<label for="checkAll">'+"全选"+'</label>'+
                        '</div>'+
                        '<li>';
                    $("#departmentGroup").append(html);
                    $.each(data.data.departPhones,function (i,item) {
                       html =
                            '<li class="member-li-sub department-li" data-departId = '+item.departId+' data-id='+item.id+' data-phonevalue='+item.fixPhone+' data-name='+item.phoneName+'>'+
                            '<div class="clearfix">'+
                            '<label>'+
                            '<input name="subBox" type="checkbox" class="member-radio">'+
                            '<span class="sub-icon circle30" style="background-color:'+telColor(item.fixPhone)+'">'+item.phoneName.slice(-2)+'</span>'+
                            '<div class="sub-name-tel" data-fixPhone='+item.fixPhone+'>'+item.phoneName+'</div>'+
                            '</label>'+
                            '</div>'+
                            '<dl class="more-phone-ul">' +
                            '<dd class="more-phone-li" data-num='+item.fixPhone+'>'+
                            '<label>'+
                            '<input type="radio" name='+i+' class="member-sub-radio" checked>'+
                            '<small>'+item.fixPhone+'</small>'+
                            '</label>'+
                            '</dd>';
                        var expandArr = item.expand.split(',');
                        $.each(expandArr, function (j, expand) {
                            if(expandArr != ""){
                                html +=
                                    '<dd class="more-phone-li" data-num='+expand+'>' +
                                    '<label>' +
                                    '<input type="radio" name='+i+' class="member-sub-radio">' +
                                    '<small>' + expand + '</small>' +
                                    '</label>' +
                                    '</dd>'
                            }
                        });
                        html += '</dl>'+'</li>';
                        $("#departmentGroup").append(html);
                        checkState();
                        //选择名下的多个号码间的切换
                        $("#departmentGroup li dl dd").on('click',function () {
                            var phonevalue = $(this).parent().parent();//#departmentGroup li
                            var numData = $(this).attr("data-num");//#departmentGroup li dl dd
                            var inputI = $(this).children().children();//#departmentGroup li dl dd label input[type-radio]
                            $(inputI).change(function () {
                                if($(inputI).prop("checked")){
                                    $(phonevalue).attr("data-phonevalue",numData);
                                    //切换号码是取消checkbox的选中状态，
                                    var itemUl = document.getElementById("select2-choices");
                                    var itemli = itemUl.getElementsByTagName("li");
                                    if(itemli){
                                        for(var m = 0; m<itemli.length; m++){
                                            if($(phonevalue).attr("data-id") == $(itemli[m]).attr("data-id")){
                                                $(itemli[m]).attr("title",numData);
                                            }
                                        }
                                    }
                                }

                            });
                        });
                        //检查左边添加的人是不是右边列表中的，如果是，就添加checkbox选中状态。
                        var currentLi = $("#select2-choices li");
                        var departmentGroup = document.getElementById("departmentGroup");
                        var itemli2 = departmentGroup.getElementsByTagName("li");
                        if(itemli2){
                            for(var j=0 ;j<itemli2.length;j++){
                                for(var x=0;x<currentLi.length;x++){
                                    if($(itemli2[j]).attr("data-id") == $(currentLi[x]).attr("data-id")){
                                        $(itemli2[j]).find("input[name='subBox']").prop("checked",true);
                                    }
                                    var $subBox = $("input[name='subBox']");
                                    $("#checkAll").prop("checked",$subBox.length == $("input[name='subBox']:checked").length ? true : false);
                                }
                            }
                        }
                    });
                    // //全选
                    // var subBox = document.getElementsByName("subBox");
                    // var $subBox = $("input[name='subBox']");
                    // $("#checkAll").click(function() {
                    //     $subBox.prop("checked",$("#checkAll").is(':checked') ? true : false);
                    // });
                    // $subBox.click(function(){
                    //     $("#checkAll").prop("checked",$subBox.length == $("input[name='subBox']:checked").length ? true : false);
                    // });


                    var oSubBox = document.getElementsByName("subBox");
                    var oCheckAll = document.getElementById("checkAll");
                    checkAll(oCheckAll,oSubBox);
                    var $subBox = $("input[name='subBox']");
                    $subBox.click(function(){
                        $("#checkAll").prop("checked",$subBox.length == $("input[name='subBox']:checked").length ? true : false);
                    });


                    $("#checkAll").change(function () {
                        if($("#checkAll").prop("checked")){
                            $.each(data.data.departPhones,function (i,item) {
                                checkAllAdd(item);
                            });
                            smscount();
                        }else{
                            $.each(data.data.departPhones,function (i,item) {
                                checkAllCut(item)
                            });
                            smscount();
                        }
                    });
                    //全选添加人员--根据部门id，控制部门人员
                    // $("#checkAll").change(function () {
                    //     if($("#checkAll").prop("checked")){
                    //         $.each(data.data.departPhones,function (i,item) {
                    //             var itemUl = document.getElementById("select2-choices");
                    //             var itemli = itemUl.getElementsByTagName("li");
                    //             if(itemli){
                    //                 for(var w = 0; w<itemli.length; w++){
                    //                     if(item.phoneName == $(itemli[w]).attr("data-text") && item.fixPhone == $(itemli[w]).attr("title")){
                    //                         $(itemli[w]).remove();
                    //                     }
                    //                 }
                    //             }
                    //             addselect2(item.phoneName,item.fixPhone,item.departId,item.id);
                    //         });
                    //         smscount();
                    //     }else{
                    //         $.each(data.data.departPhones,function (i,item) {
                    //             var itemUl = document.getElementById("select2-choices");
                    //             var itemli = itemUl.getElementsByTagName("li");
                    //             for (var i = 0; i < itemli.length; i++) {
                    //                 if (item.departId == $(itemli[i]).attr("data-departId")) {
                    //                     $(itemli[i]).remove();
                    //                 }
                    //             }
                    //         });
                    //         smscount();
                    //     }
                    // });
                    //单选添加人员--根据号码和姓名进行匹配
                    $subBox.change(function () {
                        var currentLi = $(this).parent().parent().parent();
                        var itemUl = document.getElementById("select2-choices");
                        var itemli = itemUl.getElementsByTagName("li");
                        if($(this).prop("checked")){
                            addselect2(currentLi.attr("data-name"),currentLi.attr("data-phonevalue"),currentLi.attr("data-departid"),currentLi.attr("data-id"),true);
                            smscount();
                        }else{
                            //删除已选成员
                            for(var i = 0; i<itemli.length; i++){
                                if(currentLi.attr("data-name") == $(itemli[i]).attr("data-text") && currentLi.attr("data-phonevalue") == $(itemli[i]).attr("title")){
                                    $(itemli[i]).remove();
                                }
                            }
                            smscount();
                        }
                    });
                    //点击显示隐藏
                    $("#departmentGroup li").on('click',function () {
                        if($(this).find("dl").css("display")=="none"){
                            $(this).find("dl").show();
                        }else{
                            $($(this).find("dl")).hide();
                        }
                    });
                }
            },
            complete: function () {
                $(".spinner").hide();
            }
        }); //$ajax

    }//departmentSub(departId,departName)
    function checkAllAdd(item) {
        var itemUl = document.getElementById("select2-choices");
        var itemli = itemUl.getElementsByTagName("li");
        if(itemli){
            for(var w = 0; w<itemli.length; w++){
                if(item.phoneName == $(itemli[w]).attr("data-text") && item.fixPhone == $(itemli[w]).attr("title")){
                    $(itemli[w]).remove();
                }
            }
        }
        addselect2(item.phoneName,item.fixPhone,item.departId,item.id);
    }
    function checkAllCut(item){
        var itemUl = document.getElementById("select2-choices");
        var itemli = itemUl.getElementsByTagName("li");
        for (var i = 0; i < itemli.length; i++) {
            if (item.departId == $(itemli[i]).attr("data-departId")) {
                $(itemli[i]).remove();
            }
        }
    }

    //全选
    function checkAll(checkAll,subBox) {
        checkAll.onclick = function () {
            if(checkAll.checked){
                for(i=0;i<subBox.length;i++){
                    subBox[i].checked = true;
                }
            }else{
                for(i=0;i<subBox.length;i++){
                    subBox[i].checked = false;
                }
            }
        };
    }
    
    //全选的整合
    // var  checkFun = function() {//当前全选按钮，当前子选的所有按钮
    //     //全选
    //     // var $subBox = $("input[name='subBox']");
    //     // checkAll.onclick = function () {
    //         console.log("234");
    //     var $subBox = $("input[name='subBox']");
    //     $subBox.prop("checked",$("#checkAll").is(':checked') ? true : false);
    //     // };
    //
    //
    //     // $("input[name='checkall']").click(function() {
    //     //     $subBox.prop("checked",$("#checkAll").is(':checked') ? true : false);
    //     // });
    //     // $subBox.click(function(){
    //     //     $("#checkAll").prop("checked",$subBox.length == $("input[name='subBox']:checked").length ? true : false);
    //     // });
    // };
    function b(str, strlen){
        var reg = "^[0-9]{"
            +strlen
            +"}$";
        reg = new RegExp(reg);
        return reg.test(str);
    }
    //临时号码逻辑---添加
    $("#add-member").on("click",function () {
        var tel = $('input[name="add-tel"]').val();
        var name = $('input[name="add-name"]').val();
        if(tel =="" && name==""){
            toastr.info("请输入查询号码或姓名！");
            return false;
        }
        var telBlern = b(tel,11);
        if(telBlern != true && tel!=""){
            toastr.info("请输入有效号码！");
            return false;
        }
        //如果号码已经存在
        var selectUl2 = document.getElementById("select2-choices");
        var selectLi2 = selectUl2.getElementsByTagName("li");
        if(selectLi2){
            for(var j=0;j<selectLi2.length;j++){
                if(tel == $(selectLi2[j]).attr("title")){
                    toastr.info("添加的号码已存在！");
                    $('input[name="add-tel"]').val("");
                    return false;
                }
                if(name == $(selectLi2[j]).attr("data-text")){
                    toastr.info("添加的姓名已存在！");
                    $('input[name="add-name"]').val("");
                    return false;
                }
            }
        }
        $.ajax({
            cache: true,
            type: "POST",
            url:"department2.json",
            data:$('#add-num-form').serialize(),// 你的formid,serialize()函数会把表单要提交的数据序列化成参数形式
            async: false,
            beforeSend: function () {
                showSpin("main");
            },
            success: function(data) {
                var arr = [];//名称组
                var telGroup= [];//主号码组
                var expandArr=[];//子号码组
                var departName = data.data.departName;
                $.each(data.data.departPhones,function (i,item) {//i=0
                    var names = item.phoneName;
                    names = names.split(",");
                    var tels = item.fixPhone;
                    tels = tels.split(",");
                    if(names.indexOf(name)>-1){
                        addselect2(name,item.fixPhone,item.departId,item.id,true);//姓名，电话号码,部门id,人员id
                        departmentSub(item.departId,departName);
                    }else if(tels.indexOf(tel)>-1){
                        addselect2(item.phoneName,tel,item.departId,item.id,true);
                        departmentSub(item.departId,departName);
                    }else{
                        expandArr = item.expand.split(',');
                        $.each(expandArr,function (j,expand) {
                            if(expand){
                                var expand = expand.split(",");
                                if(expand.indexOf(tel)>-1){
                                    // addselect2(item.phoneName,tel,item.departId,item.id,true);
                                    departmentSub(item.departId,departName);
                                    toastr.info("此号码已存在公司列表下，请选择");
                                    $('input[name="add-name"]').val("");
                                    return false;
                                }
                            }
                        });
                    }
                    //如果名字存在，取数组。
                    if(name){
                        var ind = names.indexOf(name);
                        arr = arr.concat(ind);
                    }
                    //如果号码存在
                    if(tel){
                        //合并两个数组
                        telGroup = telGroup.concat(tels);
                        telGroup = telGroup.concat(expandArr);
                        //数组去空
                        for(var p = 0 ;p<telGroup.length;p++)
                        {
                            if(telGroup[p] == ""){
                                telGroup.splice(p,1);
                                p= p-1;
                            }
                        }
                    }
                });
                //此处判断添加的姓名是否在数据中。
                if(arr.length>0){//
                    if(arr.indexOf(0)>-1){
                        return false;//如果名字匹配，就返回,防止执行临时成员的事件
                    }else{
                        //否则提示"此人不在公司列表中，请添加号码"
                        toastr.info("此人不在公司列表中，请添加号码");
                        $('input[name="add-name"]').val("");
                        return false;
                    }
                }
                //此处判断号码是否在数据中，如果不在，显示为临时号码。
                var srdata = [];//获取没有匹配的号码数据
                if(telGroup){//telGroup中包括fixPhone和expand号码
                    for(var p = 0 ;p<telGroup.length;p++)
                    {
                        if(telGroup[p].indexOf(tel)>-1){
                            return false;
                        }else{
                            srdata=tel;
                        }
                    }
                }
                addselect2("临时成员",srdata,null,null,null);
                //此处是判断匹配的时候清空
                $('input[name="add-name"]').val("");
                $('input[name="add-tel"]').val("");
            },
            complete: function () {
                $(".spinner").hide();
            }
        });
        smscount();
        //此处展开列表清空
        $('input[name="add-name"]').val("");
        $('input[name="add-tel"]').val("");
    });
    //立即会议与预约会议的切换
    $('input:radio[name="meeting"]:eq(1)').change( function(){
        $("#dtp_input2").val("");
        $(".timevalue").val("");
        $(".appointment").css("display","block");
    });
    $('input:radio[name="meeting"]:eq(0)').change( function(){
        $(".appointment").css("display","none");
    });
    // $('#myModal').on('hidden.bs.modal', function (e) {
    //     modalEmpty();
    //     departmentAjax();
    // });
    $('#myModal').on('hidden.bs.modal', function (e) {
        modalEmpty();
    });

    // function loadScript(url, callback) {
    //     var script = document.createElement("script");
    //     script.type = "text/javascript";
    //     // IE
    //     if (script.readyState) {
    //         script.onreadystatechange = function () {
    //             if (script.readyState == "loaded" || script.readyState == "complete") {
    //                 script.onreadystatechange = null;
    //                 callback();
    //             }
    //         };
    //     } else { // others
    //         script.onload = function () {
    //             callback();
    //         };
    //     }
    //     script.src = url;
    //     document.body.appendChild(script);
    // }
    //模态窗数据验证和提交

    // $('#myModal').on('hidden.bs.modal', function (e) {
    //     $("#select2-choices").html("");
    //     console.log("666");
    // });
    var otem = [];
    var timestamp;//时间
    var meetTitle = "";
    //弹窗提交事件：弹窗点击确定执行update();
    function update() {
        otem = [];
        meetTitle = $('input[name="meetTitle"]').val();
        var itemUl = document.getElementById("select2-choices");
        var itemli = itemUl.getElementsByTagName("li");
        if(itemli){
            $(itemli).each(function (i, e) {
                var obj = {name: $(e).attr("data-text"), tel: $(e).attr("title"), departId: $(e).attr("data-departid")};
                otem.push(obj);
            });
        }
        if (otem == "") {
            toastr.info("请添加成员");
            return false;
        } else {
            //根据立即会议和预约会议的checkbox状态判断区分；
            if ($("input:radio[name='meeting']")[0].checked) {
                //如果是立即会议
                timestamp = Date.parse(new Date());//传当前时间
                var html = "";
                $(".member-grounp").html("");
                $(".member").show();
                $(".emptyI").hide();
                $(".host-icon").text(phoneName.slice(-2));
                $(".host-icon").css("background-color",telColor(fixPhone));
                $(".host").text("主持人:" + phoneName);
                $.each(otem, function (i, o) {
                    var num = o.tel;
                    html += '<li data-departId=' + o.departId + ' data-tel=' + o.tel + '>' +
                        // '<span class="m-icon" style="background-color:rgb'+$.trim(bg)+'">' + o.name.slice(-2) + '</span>' +
                        '<span class="m-icon" style="background-color:'+telColor(num)+'">' + o.name.slice(-2) + '</span>' +
                        '<p class="name">' + o.name + '</p>' +
                        '</li>';
                });
                html +=
                    '<li class="addBtn" id="addBtn" data-toggle="modal" data-target="#myModal">' +
                    '<span class="addI">' + '</span>' +
                    '</li>' + '</ul>';
                $(".member-grounp").append(html);

                $(".member-grounp").on('click',"li .m-icon",function (ev) {
                    var omeetingSet = document.getElementById("meetingSet");
                    // 获取event对象，兼容性写法
                    var ev = ev || event;
                    //判断显示
                    omeetingSet.style.display="block";
                    // 鼠标按下时的位置
                    var mouseDownX = ev.clientX;
                    var mouseDownY = ev.clientY;
                    omeetingSet.style.left = mouseDownX+"px";
                    omeetingSet.style.top = mouseDownY+"px";

                    $(document).on("click", function(){
                        omeetingSet.style.display="none";
                    });
                    ev.stopPropagation();
                });
                //点击加号，把人员在添加到模态窗中，做已有数据到修改
                $("#addBtn").click(function () {
                    $.each(otem, function (i, o) {
                        addselect2(o.name,o.tel,o.departId,null,true); //姓名，电话号码,部门id,人员id,chbox状态
                    });

                    smscount();
                })
            }else if ($("input:radio[name='meeting']")[1].checked) {
                //如果是预约会议；
                var datetime1 = $("#dtp_input2").val();//取预定时间
                if(datetime1==""){
                    toastr.info("请设置预约会议时间");
                    return false;
                }else{
                    //将预定时间转时间戳
                    var datetimestamp = Date.parse(datetime1).toString();
                    var dts = datetimestamp.substr(0, datetimestamp.length - 3);
                    timestamp = dts;
                }
                $(".member-grounp").html("");
                $(".member").hide();
                $(".emptyI").show();
                $("#meeting-record").before(
                    '<ul class="meeting getList">'+
                    '<li>'+
                    '<div class="three-icon">'+
                    '<span class="small-icon">立娟</span>'+
                    '<span class="small-icon" style="float:left;margin-right:6px;">小强</span>'+
                    '<span class="small-icon" style="float:left;">灿烂</span>'+
                    '</div>'+
                    '<div class="right-cont">'+
                    '<p>'+
                    '<span class="content">'+meetTitle+'</span>'+
                    '<span class="time">'+datetime1+'</span>'+
                    '<a class="reservation" data-recordType='+"预约会议"+' href="#">预约会议</a>'+
                    '</p>'+
                    '</div>'+
                    '</li>'+
                    '</ul>'
                );
                submitModal();
                //提交后刷新
                window.location.reload();
            }
            console.log(timestamp);
        }
        // $('#myModal').modal('hide');
        if(otem!="" || timestamp != undefined){
            $('#myModal').modal('hide');
        }
    }

    //弹窗确定
    $("#okBtn").click(function () {
        update();
    });

    //根据手机号取色事件；
    function telColor(num) {
        $.trim(num);//去空格
        var bg1 = "1"+num.slice(5,7);
        var bg2 = "1"+num.slice(7,9);
        var bg3 = "1"+num.slice(9,11);
        return "rgb("+bg1+","+bg2+","+bg3+")";
    }

    //提交弹窗信息事件
    // 1,立即会议，点击立即发起，执行submitModal事件；
    // 2,预约会议，点击弹窗确定update()，其中判断后，执行submitModal事件
    function submitModal() {
        var calledNumberArr = [];
        var tempNumberNamesArr = [];
        var tempNumbersArr = [];
        console.log("345");
        $.each(otem,function (i,o) {
            if(o.departId == "null"){
                if(this.name=="临时成员"){
                    var tel = this.tel;
                    tel = tel.split(",");
                    for(var j in tel){
                        tempNumbersArr.push(tel[j]);
                    }
                    var name = this.name;
                    name = name.split(",");
                    for(var j in name){
                        tempNumberNamesArr.push(name[j]);
                    }
                }
            }else{
                var callTel = o.tel;
                callTel = callTel.split(",");
                for(var j in callTel){
                    calledNumberArr.push(callTel[j]);
                }
            }
        });
        $.ajax({
            type:"post",
            url:"department2.json",
            data:{
                calledNumber:calledNumberArr,//被叫者的号码数组
                companyId:companyId,//发起会议的公司ID
                fixPhone:fixPhone,		//string	发起者的号码
                meetTitle:meetTitle,	//string	会议标题
                startTime:timestamp,		//string	//会议开始时间
                tempNumberNames:tempNumberNamesArr,		//string	临时号码名称数组
                tempNumbers:tempNumbersArr//临时号码数组
            }
        })
    }
    //modal清空事件
    function modalEmpty(){
        $("#select2-choices").html("")//清空成员；
        $("input[name ='meetTitle']").val("");//清空会议主题；
        $("#dtp_input2").val("");//清空时间
        $(".timevalue").val("");//清空时间
        $("#checkAll").prop("checked",false);//取消全选勾选状态
        $("input[name='subBox']").prop("checked",false);//取消成员勾选状态
        $(".select-user-count").text("已选： 0／500人");
    }

    //立即发起会议
    $("#atOnce").on('click',function () {
        submitModal();
        //提交后刷新：先清空再加载
        $("#meeting-record").html("");//会议记录列表先清空
        ajaxPage(page);//在请求加载列表事件
    });
    //取消会议
    $("#cancelMeeting").click(function () {
        $(".member-grounp").html("");
        $(".member").hide();
        $(".emptyI").show();
    })
});
//需要完善问题：
//1,当选择人员下面当radio按钮，全选默认是fixPhone，需要修改458处；如果先选择全选，在修改radio的值是正常的。





