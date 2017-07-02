
//-------------------------------------------Octopus-------------------------------------------//
var Octopus = function() {
    this.data = new Data();

    viewapi = {
        add_edge: this.add_edge(),
        remove_edge: this.remove_edge()
    };
    this.view = new View(viewapi);

    this.update_view();
    //this.cy = this.view.cy;

    //this.make_sample_graph();
    //this.cy_functionality();
};

//-------------------------------------------view api-------------------------------------------//
Octopus.prototype.add_edge = function() //"n7", "n15"
{
    var me = this;
    var nested = function(node1, node2){
        var node1 = parseInt(node1.substr(1));
        var node2 = parseInt(node2.substr(1));
        me.data.add_edge(node1,node2);
    };
    return nested;
};

Octopus.prototype.remove_edge = function() //"n7", "n14"
{
    var me = this;
    var nested = function(node1, node2){
        var node1 = parseInt(node1.substr(1));
        var node2 = parseInt(node2.substr(1));
        me.data.remove_edge(node1,node2);
    };
    return nested;
}


//-------------------------------------------color-------------------------------------------//
Octopus.prototype.color = function()
{
    var matrix = matrix_copy(this.data.edges);
    var non0_pos = matrix_find_non0(matrix);
    if(non0_pos.row == -1) return;

    matrix = matrix_swap_row(matrix, non0_pos.row, 0);
    matrix = matrix_swap_col(matrix, non0_pos.col, 0);

    var coloring = program(matrix);

    coloring = matrix_swap_col(coloring, non0_pos.col, 0);
    coloring = matrix_swap_row(coloring, non0_pos.row, 0);

    coloring = matrix_normalize_min(coloring);

    console.log(coloring);

    this.view.show_coloring(coloring);
}

//-------------------------------------------new graph-------------------------------------------//
Octopus.prototype.new_graph = function() {
    var n1 = document.getElementById("n1").value;
    var n2 = document.getElementById("n2").value;
    n1 = parseInt(n1);
    n2 = parseInt(n2);

    this.data.set_graph(n1,n2);
    console.log(n1);
    console.log(n2);

    this.update_view();
};

//-------------------------------------------update view-------------------------------------------//
Octopus.prototype.update_view = function() {
    var n1 = this.data.n1;
    var n2 = this.data.n2;
    this.view.update(n1,n2);
};


var oct = new Octopus();