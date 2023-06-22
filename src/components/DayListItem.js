import React from "react";
import classNames from 'classnames';
import './DayListItem.scss';
import { formatSpots } from "../helpers/formatSpots";




export default function DayListItem(props) {
    const { name, spots, setDay } = props;
    const spotsMessage = formatSpots(spots);

    //conditional css 
    const dayClass = classNames({
        "day-list__item": true,
        "day-list__item--selected": props.selected,
        "day-list__item--full": props.spots === 0
    });

    return (
        <li className={dayClass} data-testid="day" onClick={() => setDay(name)}>
            <h2 className="text--regular">{name}</h2>
            <h3 className="text--light">{spotsMessage}</h3>
        </li>
    );
}

