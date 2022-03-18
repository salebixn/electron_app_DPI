var V = 6;

// Возвращает true, если существует путь от источника s до t в остаточном графе
function bfs(rGraph, s, t, parent) {

    // Создаёт массив посещённых вершин и отмечает непосещённые
    var visited = new Array(V);
    for (let i = 0; i < V; ++i)
        visited[i] = false;

    // Создаётся очередь, в которую помещается исходная вершина и она помечается
    // как посещённая
    var queue = [];
    queue.push(s);
    visited[s] = true;
    parent[s] = -1;

    while (queue.length != 0) {
        let u = queue.shift();

        for (let v = 0; v < V; v++) {
            if (visited[v] == false &&
                rGraph[u][v] > 0) {

                if (v == t) {
                    parent[v] = u;
                    return true;
                }
                queue.push(v);
                parent[v] = u;
                visited[v] = true;
            }
        }
    }

    return false;
}

// Возвращает максимальный поток от s до t в заданном графе
function fordFulkerson(graph, s, t) {
    var u, v;

    var rGraph = new Array(V);

    for (u = 0; u < V; u++) {
        rGraph[u] = new Array(V);
        for (v = 0; v < V; v++)
            rGraph[u][v] = graph[u][v];
    }

    var parent = new Array(V);

    var max_flow = 0;

    // Поток увеличивается, пока есть путь от источника до стока
    while (bfs(rGraph, s, t, parent)) {

        let path_flow = Number.MAX_VALUE;
        for (v = t; v != s; v = parent[v]) {
            u = parent[v];
            path_flow = Math.min(path_flow,
                rGraph[u][v]);
        }

        for (v = t; v != s; v = parent[v]) {
            u = parent[v];
            rGraph[u][v] -= path_flow;
            rGraph[v][u] += path_flow;
        }

        max_flow += path_flow;
    }

    return max_flow;
}

module.exports = {Ford: fordFulkerson};

/*var graph = [
    [0, 16, 13, 0, 0, 0],
    [0, 0, 10, 12, 0, 0],
    [0, 4, 0, 0, 14, 0],
    [0, 0, 9, 0, 0, 20],
    [0, 0, 0, 7, 0, 4],
    [0, 0, 0, 0, 0, 0]];

fordFulkerson(graph, 1, 4));*/