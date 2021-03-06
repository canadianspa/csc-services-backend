import React, { useState, useReducer, useEffect } from "react";

import moment from "moment";
import { toast } from "react-toastify";

import * as api from "../../api/BackendApi";
import { EMAILS } from "../../config";
import { reducer } from "../utils";
import { Jumbotron, Spinner } from "../Shared";

import FormView from "./FormView";
import InitialView from "./InitialView";

const initialFormState = {
  orderUrl: "",
  calendar: null,
  attendees: [EMAILS[0]],
  title: "",
  date: moment().format("YYYY-MM-DD"),
  time: "",
  length: "30",
};

function CalendarPage() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("initial");
  const [formState, setFormState] = useReducer(reducer, initialFormState);

  const [calendars, setCalendars] = useState([]);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  function fetchData() {
    api.getCalendars().then((response) => {
      setCalendars(response);
      setLoading(false);
    });
  }

  function onFormChange(event) {
    const { name, value } = event.target;
    setFormState({ [name]: value });
  }

  function onResponse(response, onSuccess) {
    if (response.error) {
      toast.error(response.message);
    } else {
      onSuccess(response);
    }
  }

  function toggleView() {
    if (view === "initial") {
      var params = {
        orderUrl: formState.orderUrl,
      };

      api.getVeeqoOrder(params).then((response) => {
        const onSuccess = () => {
          toast.dark(`Using order ${response.number}`);
          setOrder(response);
          setView("form");
        };

        onResponse(response, onSuccess);
      });
    } else {
      setFormState(initialFormState);
      setOrder(null);
      setView("initial");
    }
  }

  function createEvent() {
    const { calendar, title, date, time, length, attendees } = formState;

    if (title !== "" && date !== "" && time !== "") {
      setLoading(true);

      var datetime = `${date} ${time}`;
      var format = "YYYY-MM-DD HH-mm";
      var start = moment(datetime, format);

      var params = {
        event: {
          order: order,
          calendar: calendar,
          attendees: attendees,
          title: title,
          start: start.toISOString(),
          end: start.add(length, "minutes").toISOString(),
        },
      };

      api.createEvent(params).then((response) => {
        const onSuccess = () => {
          toast.dark("Event added successfully");
          toggleView();
        };

        setLoading(false);
        onResponse(response, onSuccess);
      });
    } else {
      toast.dark("No inputs may be empty");
    }
  }

  return (
    <>
      <Jumbotron>Create Event</Jumbotron>
      {loading ? (
        <Spinner />
      ) : view === "initial" ? (
        <InitialView
          formState={formState}
          onFormChange={onFormChange}
          calendars={calendars}
          emails={EMAILS}
          toggleView={toggleView}
        />
      ) : (
        <FormView
          formState={formState}
          onFormChange={onFormChange}
          onSubmit={createEvent}
          toggleView={toggleView}
        />
      )}
    </>
  );
}

export default CalendarPage;
