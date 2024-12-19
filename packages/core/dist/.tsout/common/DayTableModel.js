export class DayTableModel {
    constructor(daySeries, breakOnWeeks) {
        let { dates } = daySeries;
        let daysPerRow;
        let firstDay;
        let rowCnt;
        if (breakOnWeeks) {
            // count columns until the day-of-week repeats
            firstDay = dates[0].getUTCDay();
            for (daysPerRow = 1; daysPerRow < dates.length; daysPerRow += 1) {
                if (dates[daysPerRow].getUTCDay() === firstDay) {
                    break;
                }
            }
            rowCnt = Math.ceil(dates.length / daysPerRow);
        }
        else {
            rowCnt = 1;
            daysPerRow = dates.length;
        }
        this.rowCnt = rowCnt;
        this.colCnt = daysPerRow;
        this.daySeries = daySeries;
        this.cells = this.buildCells();
        this.headerDates = this.buildHeaderDates();
    }
    buildCells() {
        let rows = [];
        for (let row = 0; row < this.rowCnt; row += 1) {
            let cells = [];
            for (let col = 0; col < this.colCnt; col += 1) {
                cells.push(this.buildCell(row, col));
            }
            rows.push(cells);
        }
        return rows;
    }
    buildCell(row, col) {
        let date = this.daySeries.dates[row * this.colCnt + col];
        return {
            key: date.toISOString(),
            date,
        };
    }
    buildHeaderDates() {
        let dates = [];
        for (let col = 0; col < this.colCnt; col += 1) {
            dates.push(this.cells[0][col].date);
        }
        return dates;
    }
    sliceRange(range) {
        let { colCnt } = this;
        let seriesSeg = this.daySeries.sliceRange(range);
        let segs = [];
        if (seriesSeg) {
            let { firstIndex, lastIndex } = seriesSeg;
            let index = firstIndex;
            while (index <= lastIndex) {
                let row = Math.floor(index / colCnt);
                let nextIndex = Math.min((row + 1) * colCnt, lastIndex + 1);
                segs.push({
                    row,
                    firstCol: index % colCnt,
                    lastCol: (nextIndex - 1) % colCnt,
                    isStart: seriesSeg.isStart && index === firstIndex,
                    isEnd: seriesSeg.isEnd && (nextIndex - 1) === lastIndex,
                });
                index = nextIndex;
            }
        }
        return segs;
    }
}
//# sourceMappingURL=DayTableModel.js.map