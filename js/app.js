//用来计算分数
var score = 0;
//一轮游戏有十次死亡机会
var blood = 10;
// 这是游戏人物要躲避的敌人
var Enemy = function() {
    //用数组的方式随机输出敌人的y值
    var position = [64, 148, 232];
    var i = Math.floor(Math.random() * 100) % 3;
    //敌人的速度随机在100到600之间
    this.speed = 100 + Math.random() * 500;
    this.x = -100;
    this.y = position[i];
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
// 给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
// 都是以同样的速度运行的
    var position = [64, 148, 232];
    var i = Math.floor(Math.random() * 100) % 3;

    //敌人超出游戏区域返回重新出发并随机更新y值
    if(this.x > 606){
        this.x = -100;
        this.y = position[i];
    }else{
        this.x += this.speed * dt;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人
Enemy.prototype.render = function() {
ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 实现玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(){
    //随机输出游戏人物
    var _players = ['images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'];
    var _i = Math.floor(Math.random() * 100) % 5;

    //定义游戏人物初始位置
    this.x = 200;
    this.y = 400;
    this.sprite = _players[_i];
};

Player.prototype.update = function(dt){
    //若成功过河，分数加1，游戏人物返回初始位置
    if(this.y < -50){
        score ++;
        this.x = 200;
        this.y = 400;
    }
    //发生碰撞，回调函数
    this.checkCollisions();
};

//此为游戏必须的函数，用来在屏幕上画出游戏人物
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

//此为键盘敲击函数
Player.prototype.handleInput = function(key){
    if (key == "left"){
        this.x = this.x -100;
    }else if (key == "right"){
        this.x = this.x +100;
    }else if (key == "up"){
        this.y = this.y -84;
    }else if (key == "down"){
        this.y = this.y +84;
    }
};

//碰撞满足条件
function collisionsCondition(_arr, _this){
    var _length=_arr.length;
    for(var i = 0; i < _length; i++)
    {
        if(Math.abs(_this.x - _arr[i].x) < 50 && Math.abs(_this.y - _arr[i].y) < 42)
        return true;
    }
    return false;
}

//碰撞检测函数
Player.prototype.checkCollisions = function (){
    //发生碰撞，游戏人物返回初始位置，血量减1，若血量为0，弹出框提示游戏结束

        if(collisionsCondition(allEnemies, this)){
            this.x = 200;
            this.y = 400;
            blood--;
            if(blood === 0){
                alert('Game over!')
            }
        }else{
            return player.x, player.y;

    }
}
// 实例化所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies=[];

for (var n = 0;n<3;n++){
    var enemy = new Enemy();
    allEnemies.push(enemy);
};

var player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
