class GridDrawer {

    constructor (_context) {
        this.context = _context;
    }

    outline (_grid, _unitWidth, _unitHeight, _strokeStyle) {
        this.context.strokeStyle = _strokeStyle
        for (var row = 0; row < _grid.rows; row++) {
            for (var col = 0; col < _grid.cols; col++) {
                if (_grid.grid[row][col] == 1) {
                    this.context.beginPath();
                    this.context.rect(col * _unitWidth, row * _unitHeight, _unitWidth, _unitHeight);
                    this.context.stroke();
                }
            }
        }
    }

    fill (_grid, _unitWidth, _unitHeight, _fillStyle) {
        this.context.fillStyle = _fillStyle;
        for (var row = 0; row < _grid.rows; row++) {
            for (var col = 0; col < _grid.cols; col++) {
                if (_grid.grid[row][col] == 1) {
                    this.context.fillRect(col * _unitWidth, row * _unitHeight, _unitWidth, _unitHeight);
                }
            }
        }
    }

    draw (_grid, _width, _height, _fillStyle = "Red", _strokeStyle = "Black") {
        var unitWidth = _width / _grid.cols;
        var unitHeight = _height / _grid.rows;
        this.fill(_grid, unitWidth, unitHeight, _fillStyle);
        this.outline(_grid, unitWidth, unitHeight, _strokeStyle);
    }

}
