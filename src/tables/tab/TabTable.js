import React, { useEffect, useState } from "react";
import "./table_structure.scss";
import uuid from "react-uuid";

import TableFooter from "./TableFooter";
import TableRow from "./TableRow";
import TableRowWithEnd from "./TableRowWithEnd";

function TabTable({
  parts,
  startingTotal,
  startingYear = 0,
  endingYear = 9999,
}) {
  const [shouldRerender, setShouldRerender] = useState(0);

  useEffect(() => {
    setShouldRerender(shouldRerender + 1);
  }, [startingYear, endingYear]);

  let localTotal = startingTotal;
  return (
    <div className="tab__table__layout">
      <div className="wrapper-1fr-header text-left">
        <div>K. 2309/ΔΥΠ</div>
      </div>
      <div className="wrapper-1fr-header">
        <div>ΜΕΡΙΔΑ ΥΛΙΚΟΥ -ΔΕΛΤΙΟ ΥΠΟΛΟΙΠΩΝ</div>
      </div>
      <div className="tab__table">
        <div className="wrapper-1-7">
          <div className="span-3 table__cell">
            1. ΥΠΟΓΡΑΦΗ ΥΠΕΘΥΝΟΥ ΕΚΔΟΣΗΣ
            <span style={{ display: "block", marginTop: "0.2rem" }}>
              ΣΦΡΑΓΙΔΑ ΜΟΝΑΔΑΣ
            </span>
          </div>
          <div className="table__cell header__cell">2. ΑΡΙΘ. ΟΝ/ΚΟΥ</div>
          <div className="table__cell header__cell">3. Α/Α ΜΕΡΙΔΑΣ</div>
          <div className="table__cell header__cell">4. ΠΕΡΙΓΡΑΦΗ</div>
          <div className="table__cell header__cell">5. ΘΕΣΗ ΥΛΙΚΟΥ</div>
          <div className="table__cell header__cell">
            6. ΑΡΙΘΜΟΣ ΚΑΤΑΣΚΕΥΑΣΤΟΥ
          </div>
          <div className="table__cell header__cell">7. ΣΤΟΙΧ ΕΙΔΙΚ. ΕΚΔΟΣ</div>
        </div>
        <div className="wrapper-8-11">
          <div className="table__cell header__cell">8. ΧΡΗΣΙΜΟΠΟΙΕΙΤΑΙ ΣΕ</div>
          <div className="table__cell header__cell">9. ΜΕΙΖΟΝ ΣΥΓΚΟΡΗΜΑ</div>
          <div className="table__cell header__cell">10. ΚΩΔΙΚ. ΑΝΑΛ.</div>
          <div className="table__cell header__cell">11. ΚΩΔ. ΕΠΙΣ.</div>
        </div>
        <div className="wrapper-12-15">
          <div className="table__cell header__cell">12. ΜΟΝΑΔΑ ΜΕΤΡΗΣΗΣ</div>
          <div className="table__cell header__cell">13. ΠΟΣΟΤ. ΣΥΣΚΕΥΑΣ.</div>
          <div className="table__cell header__cell">14. ΤΙΜΗ ΜΟΝΑΔΑΣ</div>
          <div className="table__cell header__cell">15. ΑΡΜΟΔΙΟΤΗΤΑ</div>
        </div>
        <div className="wrapper-16-18">
          <div className="table__cell header__cell">16. ΠΡΟΤΙΜΩΜΕΝΟ ΥΛΙΚΟ</div>
          <div className="table__cell header__cell">17. ΕΝΑΛΛΑΚΤΑ</div>
          <div className="table__cell header__cell">18. ΥΠΟΚΑΤΑΣΤΑΤΑ</div>
        </div>
        <div className="wrapper-19">
          <div className="table__cell">19. ΠΡΟΒΛΕΠΟΜΕΝΑ</div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell center">ΗΜΕΡΟΜΗΝΙΑ</div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
        </div>
        <div className="wrapper-20-21">
          <div className="table__cell border-right-none">20. ΑΝΑΜΕΝΟΜΕΝΑ</div>
          <div className="table__cell border-left-none">21. ΟΦΕΙΛΟΕΜΕΝΑ</div>
        </div>
        <div className="wrapper-9fr">
          <div className="table__cell center">ΑΡΙΘΜΟΣ ΑΙΤΗΣΗΣ</div>
          <div className="table__cell center">ΠΟΣΟΤΗΤΑ</div>
          <div className="table__cell center">ΠΑΡΑΛΗΦ. ΥΠΟΛΟΙΠ.</div>
          <div className="table__cell center">ΠΑΡΑΛ. ΥΠΟΛΟΙΠ.</div>
          <div className="table__cell center">ΤΜΗΜΑ</div>
          <div className="table__cell center">ΗΜΕΡΟΜ.</div>
          <div className="table__cell center">ΠΟΣΟΤΗΤΑ</div>
          <div className="table__cell center">ΧΟΡ. ΥΠΟΛ.</div>
          <div className="table__cell center">ΧΟΡ. ΥΠΟΛ.</div>
        </div>
        <div className="wrapper-9fr-empty">
          <div className="table__cell border-bottom-none"></div>
          <div className="table__cell border-bottom-none"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell border-bottom-none"></div>
          <div className="table__cell border-bottom-none"></div>
          <div className="table__cell border-bottom-none"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell border-top-none"></div>
          <div className="table__cell border-top-none"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell border-top-none"></div>
          <div className="table__cell border-top-none"></div>
          <div className="table__cell border-top-none"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell border-bottom-none"></div>
          <div className="table__cell border-bottom-none"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell border-bottom-none"></div>
          <div className="table__cell border-bottom-none"></div>
          <div className="table__cell border-bottom-none"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell border-top-none"></div>
          <div className="table__cell border-top-none"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell border-top-none"></div>
          <div className="table__cell border-top-none"></div>
          <div className="table__cell border-top-none"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
        </div>
        <div className="wrapper-8fr">
          <div className="table__cell center" style={{ width: "52px" }}>
            Α/Α
          </div>
          <div
            className="table__cell center text-vertical"
            style={{ width: "82.5px", whiteSpace: "nowrap" }}
          >
            ΗΜΕΡΟΜ.
          </div>
          <div className="table__cell center" style={{ width: "82.5px" }}>
            ΑΥΤΟΣ ΠΟΥ ΠΑΡΑΔΩΣΕ ή ΠΑΡΕΛΑΒΕ
          </div>
          <div className="table__cell center" style={{ width: "96.5px" }}>
            ΑΡΙΘΜΟΣ ΕΥΡΕΤΗΡ.
          </div>
          <div className="table__cell center" style={{ width: "88.5px" }}>
            ΕΙΣΑΓΩΓΕΣ
          </div>
          <div className="table__cell center" style={{ width: "88.5px" }}>
            ΕΞΑΓΩΓΕΣ.
          </div>
          <div className="table__cell center" style={{ width: "88.5px" }}>
            ΥΠΟΛΟΙΟΠΟ
          </div>
          <div className="table__cell center" style={{ width: "115.5px" }}>
            ΠΑΡΑΤΗΡΗΣΕΙΣ
          </div>
          <div className="table__cell center">22</div>
          <div className="table__cell center">23</div>
          <div className="table__cell center">24</div>
          <div className="table__cell center">25</div>
          <div className="table__cell center">26</div>
          <div className="table__cell center">27</div>
          <div className="table__cell center">28</div>
          <div className="table__cell center">29</div>
        </div>
        <div className="wrapper-1fr">
          <div className="table__cell">ΑΠΟ ΜΕΤΑΦΟΡΑ</div>
        </div>
        {parts.map((part, index) => {
          localTotal = localTotal + part.amountRecieved - part.amountUsed;
          if (index > 0) {
            const year = part.dateRecieved
              ? parseInt(part.dateRecieved.split("-")[2])
              : parseInt(part.dateUsed.split("-")[2]);
            const previousYear = parts[index - 1].dateRecieved
              ? parseInt(parts[index - 1].dateRecieved.split("-")[2])
              : parseInt(parts[index - 1].dateUsed.split("-")[2]);
            if (year < startingYear || year > endingYear) {
              return null;
            }

            if (
              year === previousYear ||
              previousYear < startingYear ||
              previousYear > endingYear
            ) {
              return (
                <TableRow part={part} key={uuid()} currentTotal={localTotal} />
              );
            } else {
              let difference = year - previousYear + 1;
              const differenceArray = Array(difference).fill(difference);
              return differenceArray.map(() => {
                if (index === parts.length - 1 && difference === 1) {
                  return (
                    <TableRowWithEnd
                      part={part}
                      key={uuid()}
                      year={year}
                      currentTotal={localTotal}
                    />
                  );
                }
                if (difference === 1) {
                  return (
                    <TableRow
                      part={part}
                      key={uuid()}
                      currentTotal={localTotal}
                    />
                  );
                }
                difference--;
                return (
                  <>
                    <div className="wrapper-end" key={uuid()}>
                      <div className="table__cell"></div>
                      <div className="table__cell lined"></div>
                      <div className="table__cell"></div>
                    </div>
                    <div className="wrapper-start">
                      <div className="table__cell center">
                        ΚΛΕΙΝΕΤΑΙ ΓΙΑ ΤΟ ΕΤΟΣ {year - difference}
                        <div className="table__cell center">
                          ΕΤΟΣ {year - difference + 1}
                        </div>
                      </div>
                    </div>
                  </>
                );
              });
            }
          }
          return (
            <TableRow part={part} key={uuid()} currentTotal={localTotal} />
          );
        })}
        <TableFooter shouldRerender={shouldRerender} />
      </div>
    </div>
  );
}

export default TabTable;
