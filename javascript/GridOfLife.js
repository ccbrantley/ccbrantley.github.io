class GridOfLife {

    /*
     * _rows -> The number of rows that should be added to the grid.
     * (0, inf)
     * _cols -> The number of cols that should be added to each row of the grid.
     * (0, inf)
     * _D -> A modifier for the density of the grid.
     * This value will be added to the random generated number that
     * is used to determine whether a grid coordinate is populated.
     * (0, .5]
     *
    */
    constructor (_rows, _cols, _D = .2) {
        this.rows = _rows;
        this.cols = _cols;
        this.D = _D;
        this.initializeGrid();
        this.initializeNeighbours();
    }

    get D () {
        return this._D;
    }

    set D (_D) {
        if (0 > _D || _D > .5) {
            _D = .2;
        }
        this._D = _D;
    }

    initializeGrid () {
        // Initialize the array.
        this.grid = new Array();
        for (var row = 0; row < this.rows; row++) {
            // Add a new array to act as a row.
            this.grid.push(new Array());
            for (var col = 0; col < this.cols; col++) {
                // Add integers to hold the value of the column.
                this.grid[row].push(Math.floor(Math.random() + this.D));
            }
        }
    }

    initializeNeighbours () {
        // Initialize the array.
        this.neighbours = new Array();
        for (var row = 0; row < this.rows; row++) {
            this.neighbours.push(new Array());
            for (var col = 0; col < this.cols; col++) {
                this.neighbours[row].push(0);
            }
        }
    }

    countLiveNeighbours () {

        // Count live neighbors for the top left cell.
        this.neighbours[0][0] = this.grid[0][1] +
                                    this.grid[1][1] +
                                    this.grid[1][0];

        // Count live neighbours for the top right cell.
        this.neighbours[0][this.cols] = this.grid[1][this.cols - 1] +
                                            this.grid[1][this.cols - 2] +
                                            this.grid[0][this.cols - 2];

        // Count live neighbours for the bottom right cell.
        this.neighbours[this.rows - 1][this.cols - 1] = this.grid[this.rows - 1][this.cols - 2] +
                                                    this.grid[this.rows - 2][this.cols - 2] +
                                                    this.grid[this.rows - 2][this.cols - 1];

        // Count live neighbours for the bottom left cell.
        this.neighbours[this.rows - 1][0] = this.grid[this.rows - 2][0] +
                                            this.grid[this.rows - 2][1] +
                                            this.grid[this.rows - 1][1];

        // Count live neighbours for the top row's middle cells.
        for (var col = 1; col < this.cols - 1; col++) {
            this.neighbours[0][col] = this.grid[0][col + 1] +
                                          this.grid[1][col + 1] +
                                          this.grid[1][col] +
                                          this.grid[1][col - 1] +
                                          this.grid[0][col - 1];
        }

        // Count live neighbours for the rightmost column's middle cells.
        for (var row = 1; row < this.rows - 1; row++) {
            this.neighbours[row][this.cols] = this.grid[row - 1][this.cols - 1] +
                                                  this.grid[row + 1][this.cols - 1] +
                                                  this.grid[row + 1][this.cols - 2] +
                                                  this.grid[row][this.cols - 2] +
                                                  this.grid[row - 1][this.cols - 2];
        }

        // Count live neighbours for the bottommost row's middle cells.
        for (var col = 1; col < this.cols - 1; col++) {
            this.neighbours[this.rows - 1][col] = this.grid[this.rows - 2][col] +
                                                  this.grid[this.rows - 2][col + 1] +
                                                  this.grid[this.rows - 1][col + 1] +
                                                  this.grid[this.rows - 1][col - 1] +
                                                  this.grid[this.rows - 2][col - 1];
        }

        // Count live neighbours for the leftmost column's middle cells.
        for (var row = 1; row < this.rows - 1; row++) {
            this.neighbours[row][0] = this.grid[row - 1][0] +
                                           this.grid[row - 1][1] +
                                           this.grid[row][1] +
                                           this.grid[row + 1][1] +
                                           this.grid[row + 1][0];
        }

        // Count live neighbours for the middlemost cells.
        for (var row = 2; row < this.rows - 2; row++) {
            for (var col = 2; col < this.rows - 2; col++) {
                this.neighbours[row][col] = this.grid[row - 1][col] +
                                                this.grid[row - 1][col + 1] +
                                                this.grid[row][col + 1] +
                                                this.grid[row + 1][col + 1] +
                                                this.grid[row + 1][col] +
                                                this.grid[row + 1][col - 1] +
                                                this.grid[row][col - 1] +
                                                this.grid[row - 1][col - 1];
            }
        }
    }

    applyRules () {
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.cols; col++) {
                if (this.neighbours[row][col] == 3) {
                    this.grid[row][col] = 1;
                }
                else if ((this.neighbours[row][col] == 2) && (this.grid[row][col])) {
                    this.grid[row][col] = 1;
                }
                else {
                    this.grid[row][col] = 0;
                }
            }
        }
    }

    nextGeneration () {
        this.countLiveNeighbours();
        this.applyRules();
    }

}
