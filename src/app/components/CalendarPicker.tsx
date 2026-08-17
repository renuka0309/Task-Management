"use client";
import { useState } from "react";
import { ArrowRight, ArrowLeft, Calendar } from "lucide-react";

type CalendarPickerProps = {
    className?: string;
    onDateSelect?: (date: string) => void;
};

export default function CalendarPicker({
    className = "",
    onDateSelect,
}: CalendarPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectDate, setSelectDate] = useState(31);
    const [currentMonth, setCurrentMonth] = useState(6);
    const [currentYear, setCurrentYear] = useState(2026);

    const daysInMonth = new Date(
        currentYear,
        currentMonth + 1,
        0
    ).getDate();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const firstDay = new Date(
        currentYear,
        currentMonth,
        1
    ).getDay();

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center px-2 py-1 text-xs ${className}`}
            >
                <Calendar size={16} /> {selectDate} {" "}
                {new Date(currentYear, currentMonth).toLocaleString("default", {
                    month: "short",
                })}
            </button>

            {isOpen && (
                <div className="absolute left-0 top-full z-50 mt-2 w-[280px] rounded-lg border bg-white shadow-lg">
                    <div className="flex items-center justify-between">

                        <button
                            onClick={() => {
                                if (currentMonth === 0) {
                                    setCurrentMonth(11);
                                    setCurrentYear(currentYear - 1);
                                } else {
                                    setCurrentMonth(currentMonth - 1);
                                }
                                setSelectDate(1);
                            }}
                            className="text-gray-500"
                        >
                            <ArrowLeft />
                        </button>

                        <h3 className="text-sm font-semibold">
                            {new Date(currentYear, currentMonth).toLocaleString("default", {
                                month: "long",
                            })}{" "}
                            {currentYear}
                        </h3>

                        <button
                            onClick={() => {
                                if (currentMonth === 11) {
                                    setCurrentMonth(0);
                                    setCurrentYear(currentYear + 1);
                                } else {
                                    setCurrentMonth(currentMonth + 1);
                                }
                                setSelectDate(1);
                            }}
                            className="text-gray-500"
                        >
                            <ArrowRight />
                        </button>
                    </div>

                    <div className="mt-4 grid grid-cols-7 gap-y-2 text-center text-xs">
                        <span>Su</span>
                        <span>Mo</span>
                        <span>Tu</span>
                        <span>We</span>
                        <span>Th</span>
                        <span>Fr</span>
                        <span>Sa</span>

                        <span></span>
                        <span></span>
                        <span></span>

                        {Array.from({ length: firstDay }).map((_, index) => (
                            <span key={`empty-${index}`}></span>
                        ))}

                        {days.map((day) => (
                            <button
                                key={day}
                                onClick={() => {
                                    setSelectDate(day);
                                    onDateSelect?.(
                                        `${day} ${new Date(currentYear, currentMonth).toLocaleString("default", {
                                            month: "short",
                                        })}`
                                    );
                                    setIsOpen(false);
                                }}
                                className={
                                    selectDate === day
                                        ? "rounded-full bg-black text-white"
                                        : ""
                                }
                            >
                                {day}
                            </button>
                        ))}

                    </div>
                </div>
            )}
        </div>
    )
}