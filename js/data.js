//-------------------------------------------Data-------------------------------------------//
var Data = function() {
    this.n1 = 4;
    this.n2 = 5;

    this.make_empty(this.n1,this.n2);
};

//-------------------------------------------set graph-------------------------------------------//
Data.prototype.set_graph = function(n1,n2) {
    this.n1 = n1;
    this.n2 = n2;

    this.make_empty(n1,n2);
};

//-------------------------------------------edges manipulation-------------------------------------------//
Data.prototype.make_empty = function(n1,n2) {
    this.edges = [];
    for(var i = 0; i < n1; i++)
    {
        this.edges.push([]);
        for(var  j = 0; j < n2; j++) this.edges[i].push(0);
    }
};

Data.prototype.add_edge = function(node1, node2)
{
    this.edges[node1-1][node2-this.n1-1] = 1;
};

Data.prototype.remove_edge = function(node1, node2)
{
    this.edges[node1-1][node2-this.n1-1] = 0;
}

//-------------------------------------------g6 decrypt-------------------------------------------//
Data.prototype.g6_decrypt = function (graph_g6) {
    var tmp = graph_g6.charCodeAt(0);
    var n = tmp - 63;
    var adj = new Array(n), i, j, i1 = 1, j1 = 32, p = 1;
    for (i = 0; i < n; i++) adj[i] = new Array(n);
    for (i = 0; i < n; i++) for (j = 0; j < n; j++) adj[i][j] = 0;
    for (j = 1; j < n; j++)
        for (i = 0; i < j; i++) {
            if (--i1 == 0) {
                i1 = 6;
                tmp = graph_g6.charCodeAt(p) - 63;
                p++;
            }
            if (tmp & j1) {
                adj[i][j] = 1;
                adj[j][i] = 1;
            }
            tmp <<= 1;
        }
    return adj;
};

Data.prototype.g62bimatrix = function (graph) {
    var adjacency = this.g6_decrypt(graph);
    var n = adjacency.length;
    var V1 = [], V2 = [];
    var Q = [], color = [], j, i, tmp;
    Q.push(0);
    V1.push(0);
    color[0] = 1;
    while (Q.length > 0) {
        tmp = Q.shift();
        for (j = 0; j < n; j++)
            if (adjacency[tmp][j] && !color[j]) {
                Q.push(j);
                color[j] = color[tmp] ^ 3;
                if (color[j] == 1) V1.push(j);
                else V2.push(j);
            }
    }
    var b_matrix = new Array(V1.length);
    for (i = 0; i < V1.length; i++) b_matrix[i] = new Array(V2.length);
    for (i = 0; i < V1.length; i++)
        for (j = 0; j < V2.length; j++)
            b_matrix[i][j] = adjacency[V1[i]][V2[j]];
    return b_matrix;
};