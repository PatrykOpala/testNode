export class TableRow{
    #trPr = null;
    #tcols = [];

    constructor(tbr) {
        this.#trPr = tbr?.querySelector('trPr') || null;
        this.addTableColumn(tbr?.querySelector('tc'))
    }

    addTableColumn(tblC) {
        if (tblC !== null) {
            let tc = {
                tcPr: {
                    tcW: {
                        width: Number.parseInt(tblC?.querySelector('tcPr')?.querySelector('tcW')?.getAttribute('w:w')),
                        type: tblC?.querySelector('tcPr')?.querySelector('tcW')?.getAttribute('w:type')
                    },
                    tcBorders: {
                        top: {
                            val: tblC?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('top')?.getAttribute('w:val'),
                            sz: Number.parseInt(tblC?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('top')?.getAttribute('w:sz')),
                            space: Number.parseInt(tblC?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('top')?.getAttribute('w:space')),
                            color: tblC?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('top')?.getAttribute('w:color')
                        },
                        left: {
                            val: tblC?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('left')?.getAttribute('w:val'),
                            sz: Number.parseInt(tblC?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('left')?.getAttribute('w:sz')),
                            space: Number.parseInt(tblC?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('left')?.getAttribute('w:space')),
                            color: tblC?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('left')?.getAttribute('w:color')
                        },
                        bottom: {
                            val: tblC?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('bottom')?.getAttribute('w:val'),
                            sz: Number.parseInt(tblC?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('bottom')?.getAttribute('w:sz')),
                            space: Number.parseInt(tblC?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('bottom')?.getAttribute('w:space')),
                            color: tblC?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('bottom')?.getAttribute('w:color')
                        },
                    }
                },
                p: []
            }

            tblC?.querySelectorAll('p').forEach(p => {
                let TableColumnParagraph = new Paragraph(p)
                tc.p.push(TableColumnParagraph);
            });

            this.#tcols.push(tc);
        }
        
    }
}