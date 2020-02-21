$(function () {
    // 开始游戏按钮click事件
    start_Game_Click();

})

// 格子的坐标
var coordinate = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
//分数
var Fraction = 0;
// 开始游戏函数
function start_Game_Click() {
    $('.start_Game>button').click(function () {
        random_Number();
        $('.start_Game>button').hide();
        keyUp();
    });
}


// 方向键
function keyUp() {
    $('body').keyup(function () {
        // console.log(event.keyCode);
        switch (event.keyCode) {
            case 37: left_keyUp(); break;
            case 39: right_keyUp(); break;
            case 38: up_keyUp(); break;
            case 40: bottom_keyUp(); break;
            default: break;
        };
    });

}


// 随机生成2 4两个数字

function random_Number() {
    // 产生三个随机数，1.行数 2.列数 3. 2或者4显示在用户界面
    var row_Number = Math.floor(Math.random() * 4);
    var column_Number = Math.floor(Math.random() * 4);
    var user_Number = Math.ceil(Math.random() * 2) == 1 ? 2 : 4;
    // 当格子为空的时候添加 2or4，else 重新执行一遍该函数
    var lattice = $('.g' + row_Number + '_' + column_Number);
    if (lattice.text() == 0) {
        lattice.addClass('bg' + user_Number).text(coordinate[row_Number][column_Number] = user_Number);
    } else {
        random_Number();
    }

}

// left 键盘事件

function left_keyUp() {
    for (let index = 0; index < 3; index++) {
        for (i in coordinate) {
            for (j in coordinate) {
                if (coordinate[i][j] == 0) {
                    coordinate[i].splice(j, 1);
                    coordinate[i].push(0);
                }
                // 删除样式
                for (var number = 2; number <= 2048; number += number) {
                    $('.g' + i + '_' + j)
                        .text('')
                        .removeClass('bg' + number);
                }
            }
        }
    }
    // 获取坐标内有值得坐标，并移动
    for (i in coordinate) {
        for (j in coordinate) {
            if (coordinate[i][j] != 0) {
                $('.g' + i + '_' + j)
                    .text(coordinate[i][j])
                    .addClass('bg' + coordinate[i][j]);
            }

        }
    }
    // 根据一行是否有相同的格子，有就相加
    for (i in coordinate) {
        if (coordinate[i][0] != 0 && coordinate[i][0] == coordinate[i][1]) {
            coordinate[i][0] = (coordinate[i][0]) * 2;
            Fraction += coordinate[i][0];
            $('.g' + i + '_' + 1).text('').removeClass('bg' + coordinate[i][1]);
            $('.g' + i + '_0').text((coordinate[i][0])).addClass('bg' + coordinate[i][0]);
            coordinate[i].splice(1, 1);
            coordinate[i].push(0);
            $('.Fraction>span').text(Fraction);
        }
        if (coordinate[i][1] != 0 && coordinate[i][1] == coordinate[i][2]) {
            coordinate[i][1] = (coordinate[i][1]) * 2;
            Fraction += coordinate[i][1];
            $('.g' + i + '_' + 2).text('').removeClass('bg' + coordinate[i][2]);
            $('.g' + i + '_1').text((coordinate[i][1])).addClass('bg' + coordinate[i][1]);
            coordinate[i].splice(2, 1);
            coordinate[i].push(0);
            $('.Fraction>span').text(Fraction);
        }
        if (coordinate[i][2] != 0 && coordinate[i][2] == coordinate[i][3]) {
            coordinate[i][2] = (coordinate[i][2]) * 2;
            Fraction += coordinate[i][2];
            $('.g' + i + '_' + 3).text('').removeClass('bg' + coordinate[i][3]);
            $('.g' + i + '_' + 2).text((coordinate[i][2])).addClass('bg' + coordinate[i][2]);
            coordinate[i].splice(3, 1);
            coordinate[i].push(0);
            $('.Fraction>span').text(Fraction);
        }
    }
    random_Number();
    gameover();
}

// right 键盘事件

function right_keyUp() {
    for (let index = 0; index < 3; index++) {
        for (i in coordinate) {
            for (j in coordinate) {
                if (coordinate[i][j] == 0) {
                    coordinate[i].splice(j, 1);
                    coordinate[i].unshift(0);
                }
                // 删除样式
                for (var number = 2; number <= 2048; number += number) {
                    $('.g' + i + '_' + j)
                        .text('')
                        .removeClass('bg' + number);
                }
            }
        }
    }
    // 获取坐标内有值得坐标，并移动
    for (i in coordinate) {
        for (j in coordinate) {
            if (coordinate[i][j] != '') {
                $('.g' + i + '_' + j)
                    .text(coordinate[i][j])
                    .addClass('bg' + coordinate[i][j]);
            }
        }
    }
    // right 键盘事件
    for (i in coordinate) {
        if (coordinate[i][3] != 0 && coordinate[i][3] == coordinate[i][2]) {
            coordinate[i][3] = (coordinate[i][3]) * 2;
            Fraction += coordinate[i][3];
            $('.g' + i + '_' + 3).text(coordinate[i][3]).addClass('bg' + coordinate[i][3]);
            $('.g' + i + '_' + 2).text('').removeClass('bg' + (coordinate[i][3]) / 2);
            coordinate[i].splice(2, 1);
            coordinate[i].unshift(0);
            $('.Fraction>span').text(Fraction);
        }
        if (coordinate[i][2] != 0 && coordinate[i][2] == coordinate[i][1]) {
            coordinate[i][2] = (coordinate[i][2]) * 2;
            Fraction += coordinate[i][2];
            $('.g' + i + '_' + 2).text(coordinate[i][2]).addClass('bg' + coordinate[i][2]);
            $('.g' + i + '_' + 1).text('').removeClass('bg' + (coordinate[i][2]) / 2);
            coordinate[i].splice(1, 1);
            coordinate[i].unshift(0);
            $('.Fraction>span').text(Fraction);
        }
        if (coordinate[i][1] != 0 && coordinate[i][1] == coordinate[i][0]) {
            coordinate[i][1] = (coordinate[i][1]) * 2;
            Fraction += coordinate[i][1];
            $('.g' + i + '_' + 1).text(coordinate[i][1]).addClass('bg' + coordinate[i][1]);
            $('.g' + i + '_' + 0).text('').removeClass('bg' + (coordinate[i][1]) / 2);
            coordinate[i].splice(0, 1);
            coordinate[i].unshift(0);
            $('.Fraction>span').text(Fraction);
        }
    }
    random_Number();
    gameover();
}

// Up键盘事件

function up_keyUp() {
    // 思路：将二位数组逆时针旋转90°。和左移动一样。
    var upcoordinate = [
        [coordinate[0][3], coordinate[1][3], coordinate[2][3], coordinate[3][3]],
        [coordinate[0][2], coordinate[1][2], coordinate[2][2], coordinate[3][2]],
        [coordinate[0][1], coordinate[1][1], coordinate[2][1], coordinate[3][1]],
        [coordinate[0][0], coordinate[1][0], coordinate[2][0], coordinate[3][0]]
    ];
    // 删除二维数组中为‘0’的元素
    for (var index = 0; index <= 2; index++) {
        for (var i in upcoordinate) {
            for (var j in upcoordinate) {
                if (upcoordinate[i][j] == 0) {
                    upcoordinate[i].splice(j, 1);
                    upcoordinate[i].push(0);
                }
                for (var number = 2; number <= 2048; number += number) {
                    $('.g' + i + '_' + j)
                        .text('')
                        .removeClass('bg' + number);
                }
            }
        }
    }
    // 根据一行是否有相同的格子，有就相加
    for (i in upcoordinate) {
        if (upcoordinate[i][0] != 0 && upcoordinate[i][0] == upcoordinate[i][1]) {
            upcoordinate[i][0] = (upcoordinate[i][0]) * 2;
            Fraction += upcoordinate[i][0];
            $('.g' + i + '_' + 1).text('').removeClass('bg' + upcoordinate[i][1]);
            $('.g' + i + '_0').text((upcoordinate[i][0])).addClass('bg' + upcoordinate[i][0]);
            upcoordinate[i].splice(1, 1);
            upcoordinate[i].push(0);
            $('.Fraction>span').text(Fraction);
        }
        if (upcoordinate[i][1] != 0 && upcoordinate[i][1] == upcoordinate[i][2]) {
            upcoordinate[i][1] = (upcoordinate[i][1]) * 2;
            Fraction += upcoordinate[i][1];

            $('.g' + i + '_' + 2).text('').removeClass('bg' + upcoordinate[i][2]);
            $('.g' + i + '_1').text((upcoordinate[i][1])).addClass('bg' + upcoordinate[i][1]);
            upcoordinate[i].splice(2, 1);
            upcoordinate[i].push(0);
            $('.Fraction>span').text(Fraction);
        }
        if (upcoordinate[i][2] != 0 && upcoordinate[i][2] == upcoordinate[i][3]) {
            upcoordinate[i][2] = (upcoordinate[i][2]) * 2;
            Fraction += upcoordinate[i][2];

            $('.g' + i + '_' + 3).text('').removeClass('bg' + upcoordinate[i][3]);
            $('.g' + i + '_' + 2).text((upcoordinate[i][2])).addClass('bg' + upcoordinate[i][2]);
            upcoordinate[i].splice(3, 1);
            upcoordinate[i].push(0);
            $('.Fraction>span').text(Fraction);
        }
    }
    // 顺时针旋转90°
    coordinate = [
        [upcoordinate[3][0], upcoordinate[2][0], upcoordinate[1][0], upcoordinate[0][0]],
        [upcoordinate[3][1], upcoordinate[2][1], upcoordinate[1][1], upcoordinate[0][1]],
        [upcoordinate[3][2], upcoordinate[2][2], upcoordinate[1][2], upcoordinate[0][2]],
        [upcoordinate[3][3], upcoordinate[2][3], upcoordinate[1][3], upcoordinate[0][3]]
    ];
    // 移动元素与删除元素值为‘0’的元素
    for (i in coordinate) {
        for (j in coordinate) {
            for (var number = 2; number <= 2048; number += number) {
                $('.g' + i + '_' + j)
                    .text('')
                    .removeClass('bg' + number);
            }
            if (coordinate[i][j] != '') {
                $('.g' + i + '_' + j)
                    .text(coordinate[i][j])
                    .addClass('bg' + coordinate[i][j]);
            }

        }
    }
    random_Number();
    gameover();
}

// bottom 键盘事件

function bottom_keyUp() {
    // 思路：将二位数组逆时针旋转90°。和左移动一样。
    var upcoordinate = [
        [coordinate[0][3], coordinate[1][3], coordinate[2][3], coordinate[3][3]],
        [coordinate[0][2], coordinate[1][2], coordinate[2][2], coordinate[3][2]],
        [coordinate[0][1], coordinate[1][1], coordinate[2][1], coordinate[3][1]],
        [coordinate[0][0], coordinate[1][0], coordinate[2][0], coordinate[3][0]]
    ];
    // 删除二维数组中为‘0’的元素
    for (var index = 0; index <= 2; index++) {
        for (var i in upcoordinate) {
            for (var j in upcoordinate) {
                if (upcoordinate[i][j] == 0) {
                    upcoordinate[i].splice(j, 1);
                    upcoordinate[i].unshift(0);
                }
                for (var number = 2; number <= 2048; number += number) {
                    $('.g' + i + '_' + j)
                        .text('')
                        .removeClass('bg' + number);
                }
            }
        }
    }
    // 根据一行是否有相同的格子，有就相加
    for (i in upcoordinate) {
        for (i in upcoordinate) {
            if (upcoordinate[i][3] != 0 && upcoordinate[i][3] == upcoordinate[i][2]) {
                upcoordinate[i][3] = (upcoordinate[i][3]) * 2;
                Fraction+=upcoordinate[i][3];
                $('.g' + i + '_' + 3).text(upcoordinate[i][3]).addClass('bg' + upcoordinate[i][3]);
                $('.g' + i + '_' + 2).text('').removeClass('bg' + (upcoordinate[i][3]) / 2);
                upcoordinate[i].splice(2, 1);
                upcoordinate[i].unshift(0);
                $('.Fraction>span').text(Fraction);
            }
            if (upcoordinate[i][2] != 0 && upcoordinate[i][2] == upcoordinate[i][1]) {
                upcoordinate[i][2] = (upcoordinate[i][2]) * 2;
                $('.g' + i + '_' + 2).text(upcoordinate[i][2]).addClass('bg' + upcoordinate[i][2]);
                $('.g' + i + '_' + 1).text('').removeClass('bg' + (upcoordinate[i][2]) / 2);
                upcoordinate[i].splice(1, 1);
                upcoordinate[i].unshift(0);
                Fraction+=upcoordinate[i][2];
                $('.Fraction>span').text(Fraction);
            }
            if (upcoordinate[i][1] != 0 && upcoordinate[i][1] == upcoordinate[i][0]) {
                upcoordinate[i][1] = (upcoordinate[i][1]) * 2;
                $('.g' + i + '_' + 1).text(upcoordinate[i][1]).addClass('bg' + upcoordinate[i][1]);
                $('.g' + i + '_' + 0).text('').removeClass('bg' + (upcoordinate[i][1]) / 2);
                upcoordinate[i].splice(0, 1);
                upcoordinate[i].unshift(0);
                Fraction+=upcoordinate[i][2];
                $('.Fraction>span').text(Fraction);
            }
        }
    }
    // 顺时针旋转90°
    coordinate = [
        [upcoordinate[3][0], upcoordinate[2][0], upcoordinate[1][0], upcoordinate[0][0]],
        [upcoordinate[3][1], upcoordinate[2][1], upcoordinate[1][1], upcoordinate[0][1]],
        [upcoordinate[3][2], upcoordinate[2][2], upcoordinate[1][2], upcoordinate[0][2]],
        [upcoordinate[3][3], upcoordinate[2][3], upcoordinate[1][3], upcoordinate[0][3]]
    ];
    // 移动元素与删除元素值为‘0’的元素
    for (i in coordinate) {
        for (j in coordinate) {
            for (var number = 2; number <= 2048; number += number) {
                $('.g' + i + '_' + j)
                    .text('')
                    .removeClass('bg' + number);
            }
            if (coordinate[i][j] != '') {
                $('.g' + i + '_' + j)
                    .text(coordinate[i][j])
                    .addClass('bg' + coordinate[i][j]);
            }

        }
    }
    random_Number();
    gameover();
}

function gameover(){
    // 
}



