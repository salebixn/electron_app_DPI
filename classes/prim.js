module.exports = class Prim {
    // Основная функция простого алгоритма
    miniSpanTree_prime(index, matrix) {
        var k = index; // Начальная точка
        var edges = [];
        var closedge = this.#initClosedge(index, matrix);

        for (let i = 1; i < matrix.length; i++) {// матрицы.length-1 вершины после выбора
            k = this.#locate(closedge, matrix);
            edges.push({
                start: closedge[k].adjvex,
                end: k
            });
            closedge[k].lowcost = 0; // Добавить вершину k к минимальному остовному дереву
            // Отрегулировать закрытие
            for (let j = 0; j < matrix.length; j++) {
                if (matrix[k][j] < closedge[j].lowcost) {// Сравнить вновь добавленные точки
                    closedge[j].adjvex = k;
                    closedge[j].lowcost = matrix[k][j];
                }
            }
        }
        return edges;
    }

    // Инициализируем закрытый вспомогательный массив
    // Массив closedge представляет минимальный вес от каждой вершины, не входящей в минимальное остовное дерево, до минимального остовного дерева
    // closedge [i] (его можно понимать как индекс вершины) - это объект, в котором есть две пары ключей, а именно adjvex и lowcost.
    // lowcost представляет вес вершины i на самой короткой стороне наименьшего связующего дерева, adjvex представляет другую вершину наименьшей стороны, эта вершина должна находиться в наименьшем остовном дереве
    // Закрытый массив будет обновлен при построении минимального остовного дерева
    #initClosedge(index, matrix) {
        var result = [];
        for (let i = 0; i < matrix.length; i++) {
            let temp = {};
            if (i != index) {
                temp = {
                    adjvex: index,
                    lowcost: matrix[index][i]
                };
            } else {
                temp = {
                    adjvex: 0,
                    lowcost: 0
                };
            }
            result.push(temp);
        }
        return result;
    }

    // После обновления закрытого типа
    // Нужно получить самое низкое значение lowcost в закупках
    // Затем по этому значению получается следующая вершина, добавленная к минимальному остовному дереву
    #locate(closedge, matrix) {
        var min = 0;
        var index = 0;
        for (let i = 0; i < matrix.length; i++) {
            if (closedge[i].lowcost != 0) {
                min = closedge[i].lowcost;
                index = i;
                break;
            }
        }
        for (let i = index + 1; i < closedge.length; i++) {
            if (closedge[i].lowcost != 0 && closedge[i].lowcost < min) {
                min = closedge[i].lowcost;
                index = i;
            }
        }
        return index;
    }
};


//Матрица смежности графа (неориентированный граф)
//Если между двумя вершинами нет ребра, используйте Number.MAX_VALUE для представления веса
/*var maxValue = Number.MAX_VALUE;
var matrix = [
    [maxValue, 6, 1, 5, maxValue, maxValue],
    [6, maxValue, 5, maxValue, 3, maxValue],
    [1, 5, maxValue, 5, 6, 4],
    [5, maxValue, 5, maxValue, maxValue, 2],
    [maxValue, 3, 6, maxValue, maxValue, 6],
    [maxValue, maxValue, 4, 2, 6, maxValue]
];

// проверяем
console.log(new Prim().miniSpanTree_prime(2, matrix));*/