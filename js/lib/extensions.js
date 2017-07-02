var matrix_normalize_min = function(matrix){
    var n = matrix.length;
    var m = matrix[0].length;
    var mi = matrix[0][0] + 1000;

    for(var i = 0; i < n; i++)
        for(var j = 0; j < m; j++)
            if(matrix[i][j]!=0) mi = Math.min(mi,matrix[i][j]);

    for(var i = 0; i < n; i++)
        for(var j = 0; j < m; j++)
            if(matrix[i][j]!=0) matrix[i][j] -= (mi-1);

    return matrix;
};

var matrix_copy = function(matrix)
{
    var n = matrix.length;
    var m = matrix[0].length;
    var ret = [];
    for(var i = 0; i < n; i++)
    {
        ret.push([]);
        for(var j = 0; j < m; j++)
        {
            ret[i].push(matrix[i][j]);
        }
    }
    return ret;
}

var matrix_swap_row = function(matrix, n1, n2)
{
    if(n1 == n2) return matrix;
    var row = matrix[n1];
    matrix[n1] = matrix[n2];
    matrix[n2] = row;

    return matrix;
};

var matrix_swap_col = function(matrix, m1, m2)
{
    var n = matrix.length;
    if(m1 == m2) return matrix;
    var tmp;
    for(var i = 0; i < n; i++)
    {
        tmp = matrix[i][m1];
        matrix[i][m1] = matrix[i][m2];
        matrix[i][m2] = tmp;
    }
    return matrix;
};

var matrix_find_non0 = function(matrix)
{
    var n = matrix.length;
    var m = matrix[0].length;
    for(var i = 0; i < n; i++)
        for(var j = 0; j < m; j++)
            if(matrix[i][j]!=0) return {
                row: i,
                col: j
            };

    return {
        row: -1,
        col: -1
    };
};