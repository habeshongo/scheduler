import React from "react";
import DayListItem from "./DayListItem"; // Import the DayListItem component

export default function DayList(props) {
    console.log(props)
    const { days, value, onChange } = props;

    const dayItems = days.map((dayItem) => (
        <DayListItem
            key={dayItem.id}
            name={dayItem.name}
            spots={dayItem.spots}
            selected={dayItem.name === value}
            setDay={() => onChange(dayItem.name)}
        />
    ));

    return (
        <ul>
            {dayItems}
        </ul>
    );
}