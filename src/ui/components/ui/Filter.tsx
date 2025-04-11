import { useState } from "react";
import { DateRange } from "react-date-range";

const Filter = ({
  range,
  setRange,
  search,
  setSearch,
}: {
  range: {
    key: string;
    startDate: Date | null;
    endDate: Date | null;
  }[];
  setRange: React.Dispatch<
    React.SetStateAction<
      {
        startDate: null;
        endDate: null;
        key: string;
      }[]
    >
  >;
  search: string;
  setSearch: (v: string) => void;
}) => {
  const [showFilter, setShowFilter] = useState(false);
  console.log(range, setRange);
  const handleReset = () => {
    setRange([
      {
        startDate: null,
        endDate: null,
        key: "selection",
      },
    ]);
    setSearch("");
    setShowFilter(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 mb-6">
      <button
        onClick={() => setShowFilter((prev) => !prev)}
        className="px-4 py-2 bg-zinc-800 text-white rounded hover:bg-zinc-700 transition"
      >
        {showFilter ? "Приховати фільтр" : "Фільтр"}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          showFilter ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid sm:flex-row gap-4 items-center mt-4">
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={range}
            className="bg-zinc-900 text-white rounded shadow"
          />
          <div className="flex gap-5">
            <input
              type="text"
              placeholder="Пошук по товару"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 rounded bg-zinc-800 text-white w-full max-w-xs"
            />
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Скинути фільтри
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
