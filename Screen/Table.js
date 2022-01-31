export class Table{
    #tblPr = {
        tblW: {
            width: null,
            type: null
        },
        jc: null,
        tblInd: {
            width: null,
            type: null
        },
        tblLayout: {
            type: null
        },
        tblCellMar: {
            top: {
                width: null,
                type: null
            },
            left: {
                width: null,
                type: null
            },
            bottom: {
                width: null,
                type: null
            },
            right: {
                width: null,
                type: null
            }
        }
    };
    #tblGrid = {
        gridCols: []
    };
    #tbr = [];

    constructor(table) {

        this.#tblPr.tblW.width = table.querySelector('tblPr').querySelector('tblW').getAttribute('w:w');
        this.#tblPr.tblW.type = table.querySelector('tblPr').querySelector('tblW').getAttribute('w:type') === 'dxa' ? "DXA" : "null";
    
        this.#tblPr.jc = table.querySelector('tblPr').querySelector('jc').getAttribute('w:val');

        this.#tblPr.tblInd.width = table.querySelector('tblPr').querySelector('tblInd').getAttribute('w:w');
        this.#tblPr.tblInd.type = table.querySelector('tblPr').querySelector('tblInd').getAttribute('w:type') === 'dxa' ? "DXA" : "null";

        this.#tblPr.tblLayout.type = table.querySelector('tblPr').querySelector('tblLayout').getAttribute('w:type') || "null";
    
        this.#tblPr.tblCellMar.top.width = table?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('top')?.getAttribute('w:w');
        this.#tblPr.tblCellMar.top.type = table?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('top')?.getAttribute('w:type') === 'dxa' ? "DXA" : "null";

        this.#tblPr.tblCellMar.left.width = table?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('left')?.getAttribute('w:w');
        this.#tblPr.tblCellMar.left.type = table?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('left')?.getAttribute('w:type') === 'dxa' ? "DXA" : "null";
    
        this.#tblPr.tblCellMar.bottom.width = table?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('bottom')?.getAttribute('w:w');
        this.#tblPr.tblCellMar.bottom.type = table?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('bottom')?.getAttribute('w:type') === 'dxa' ? "DXA" : "null";
        
        this.#tblPr.tblCellMar.right.width = table?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('right')?.getAttribute('w:w');
        this.#tblPr.tblCellMar.right.type = table?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('right')?.getAttribute('w:type') === 'dxa' ? "DXA" : "null";
        
        this.addGrid(table);
    }

    addGrid(tblInss) {
        tblInss?.querySelector('tblGrid').childNodes.forEach(tblC => {
            let gridCol = {
                width: Number.parseInt(tblC.getAttribute('w:w'))
            };
            this.#tblGrid.gridCols.push(gridCol);
        })
        const tableRowCount = tblInss?.querySelectorAll('tr').length;
        if (tableRowCount > 0) {
            tblInss?.querySelectorAll('tr').forEach(trr => {
                this.addTableRow(trr);
            })
        }
    }

    addTableRow(tr) {
        let tableRow = new TableRow(tr);
        this.#tbr.push(tableRow);
    }
}