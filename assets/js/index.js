$(function() {


        //调用getUserInfo获取用户基本信息 
        getUserInfo()
    })
    //获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //我们请求获取用户信息的时候的时候就需要设置请求头信息，把我们获取到的 token 传递给后台 
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res)
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用 renderAvatar 渲染用户头像
            //吧res.data传过去
            renderAvatar(res.data)
        }
    })
}

//user接收res.data
function renderAvatar(user) {
    //获取用户名称 有昵称优先用昵称
    var name = user.nickname || user.username
        //设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
        //渲染用户头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic)
        $('.text-avater').hide()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide();
        //登录名第一个字母大写
        var first = name[0].toUpperCase();
        $('.text-avater').html(first).show();
    }
}

//点击按钮 实现用户退出功能
var layer = layui.layer
$('#btnLogout').on('click', function() {
    layer.confirm('确定要退出吗?', { icon: 3, title: '提示' }, function(index) {
        //do something
        //清空本地储存的token
        localStorage.removeItem('token')
            //重新跳转到登录页面 ??
        location.href = '/login.html'
            //关闭弹出层
        layer.close(index);
    });
})