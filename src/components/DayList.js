import React from "react";
import DayListItem from "./DayListItem"; // Import the DayListItem component

export default function DayList(props) {
    const { days, day, setDay } = props;

    const dayItems = days.map((dayItem) => (
        <DayListItem
            key={dayItem.name}
            name={dayItem.name}
            spots={dayItem.spots}
            selected={dayItem.name === day}
            setDay={setDay}
        />
    ));

    return (
        <ul>
            {dayItems}
        </ul>
    );
}