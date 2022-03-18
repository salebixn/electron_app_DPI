module.exports = class Krusk {
    // Основная функция алгоритма Крускала
    miniSpanTree_kruskal(matrix) {
        var edgeObj = this.#generateEdgeObj(matrix);
        edgeObj = this.#sortEdge_increse(edgeObj);
        // Вспомогательный массив vset хранит компоненты подграфа, к которым принадлежит каждая вершина
        // Роль этого массива - определить, будет ли вновь добавленное ребро образовывать петлю
        // Обновление при построении минимального связующего дерева
        // Начальное значение, vset [i] = i
        var vset = [];
        for (let i = 0; i < matrix.length; i++) {
            vset.push(i);
        }
        var edges = [];
        var m, n;
        for (let i = 0; i < edgeObj.length; i++) {
            m = this.#locate(edgeObj[i].start, vset);
            n = this.#locate(edgeObj[i].end, vset);
            // m, n представляют компоненты подграфа, которым принадлежат две вершины ребра
            // Когда m и n равны, это означает, что вновь добавленное ребро сформирует цикл
            if (m != n) {
                edges.push({
                    start: edgeObj[i].start,
                    end: edgeObj[i].end
                });
                vset[m] = n; // Обновить массив vset
            }
        }
        return edges;
    }

    // Формируем массив краевых объектов на основе матрицы смежности
    // Матрица смежности такая же, как в основной программе алгоритма
    // Каждый элемент в массиве является объектом
    // Объект содержит начало, конец и вес (вес) 
    #generateEdgeObj(matrix) {
        var edgeObj = [];
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < i; j++) {
                if (matrix[i][j] != Number.maxValue) {
                    edgeObj.push({
                        start: i,
                        end: j,
                        weight: matrix[i][j]
                    });
                }
            }
        }
        return edgeObj;
    }

    // Сортировка массива, сгенерированного функцией generateEdgeObj
    // Используемый здесь порядок пузырьков (возрастающий порядок)
    // Вы также можете использовать другие методы сортировки
    #sortEdge_increse(edgeObj) {
        for (let i = 0; i < edgeObj.length - 1; i++) {
            for (let j = 0; j < edgeObj.length - 1 - i; j++) {
                if (edgeObj[j].weight > edgeObj[j + 1].weight) {
                    let temp = edgeObj[j];
                    edgeObj[j] = edgeObj[j + 1];
                    edgeObj[j + 1] = temp;
                }
            }
        }
        return edgeObj;
    }

    // Находим компонент подграфа, к которому принадлежит вершина в соответствии с индексом вершины vexIndex
    #locate(vexIndex, vset) {
        var temp = vexIndex
        while (temp != vset[temp]) {
            temp = vset[temp];
        }
        return temp;
    }
};


/*maxValue = Number.MAX_VALUE;
var matrix = [
    [maxValue, 6, 1, 5, maxValue, maxValue],
    [6, maxValue, 5, maxValue, 3, maxValue],
    [1, 5, maxValue, 5, 6, 4],
    [5, maxValue, 5, maxValue, maxValue, 2],
    [maxValue, 3, 6, maxValue, maxValue, 6],
    [maxValue, maxValue, 4, 2, 6, maxValue]
];

var result = new Krusk().miniSpanTree_kruskal(matrix);
var result_start='';
var result_end='';
for (let i = 0; i < result.length; i++) {
    result_start += String(result[i]['start']) + ',';
    result_end += String(result[i]['end']) + ',';
}

console.log(result_start);
console.log(result_end);
console.log(result);*/