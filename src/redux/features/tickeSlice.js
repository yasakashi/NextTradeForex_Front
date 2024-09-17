import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createTicketAction = createAsyncThunk(
  "post/createTicketAction",
  async (
    { axiosPrivate, data, toast, resetForm, navigate },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosPrivate.post(
        "/api/ticket/createticket",
        data
      );

      console.log("createTicket", { response });
      if (response?.status === 200) {
        toast.success("Ticket created successfully.");
        resetForm();
        navigate("/traders-community/support-portal");
      }
      return response.data;
    } catch (error) {
      console.log("createTicket", error);
      return rejectWithValue(error);
    }
  }
);

export const getTicketPriorities = createAsyncThunk(
  "post/getTicketPriorities",
  async ({ axiosPrivate }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/getpriorities", {
        data: {},
      });

      console.log({ response });

      return response.data;
    } catch (error) {
      console.log("gtTicketPriorities", error);
      return rejectWithValue(error);
    }
  }
);

export const getTickets = createAsyncThunk(
  "post/getTickets",
  async ({ axiosPrivate, data, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/ticket/gettickets", data);

      console.log("getTickets", { response });

      return response.data;
    } catch (error) {
      console.log("getTickets", error);
      return rejectWithValue(error);
    }
  }
);

export const getTicket = createAsyncThunk(
  "post/getTicket",
  async ({ axiosPrivate, data, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/ticket/gettickets", data);

      console.log("getTicket", { response });

      return response.data;
    } catch (error) {
      console.log("getTicket", error);
      return rejectWithValue(error);
    }
  }
);

export const getMyTickets = createAsyncThunk(
  "post/getMyTickets",
  async ({ axiosPrivate, data, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        "/api/ticket/getmytickets",
        data
      );

      console.log("getmytickets", { response });

      return response.data;
    } catch (error) {
      console.log("getmytickets", error);
      return rejectWithValue(error);
    }
  }
);

export const answerTicketByAdmin = createAsyncThunk(
  "post/answerTicketByAdmin",
  async ({ axiosPrivate, data, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        "/api/ticket/answerticket",
        data
      );

      console.log("answerTicketByAdmin", { response });
      if (response?.status === 200) {
        toast.success("Responed recorded successfully.");
        navigate("/admin/tickets");
      }

      return response.data;
    } catch (error) {
      console.log("answerTicketByAdmin", error);
      return rejectWithValue(error);
    }
  }
);

const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    errorMsg: null,
    createTicketLoading: false,
    prioritiesLoading: false,
    getTicketsLoading: false,
    answerTicketLoading: false,
    answerTicket: {},
    ticket: {},
    tickets: [],
    ticket: [],
    priorities: [],
    myTickets: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTicketAction.pending, (state) => {
        state.createTicketLoading = true;
        state.errorMsg = null;
      })
      .addCase(createTicketAction.fulfilled, (state, action) => {
        console.log({ action });
        state.createTicketLoading = false;
        state.ticket = action?.payload?.messageData;
        state.errorMsg = null;
      })
      .addCase(createTicketAction.rejected, (state, action) => {
        console.log({ action });
        state.createTicketLoading = false;
        state.errorMsg = action?.payload;
      })
      // ------------------------------
      .addCase(getTicketPriorities.pending, (state) => {
        state.prioritiesLoading = true;
        state.errorMsg = null;
      })
      .addCase(getTicketPriorities.fulfilled, (state, action) => {
        console.log({ action });
        state.prioritiesLoading = false;
        state.errorMsg = null;
        state.priorities = action?.payload?.messageData;
      })
      .addCase(getTicketPriorities.rejected, (state, action) => {
        console.log({ action });
        state.prioritiesLoading = false;
        state.errorMsg = action?.payload;
      })

      // /////////////////////////////// ------------------------------
      .addCase(getTickets.pending, (state) => {
        state.getTicketsLoading = true;
        state.errorMsg = null;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        console.log({ action });
        state.getTicketsLoading = false;
        state.errorMsg = null;
        state.tickets = action?.payload?.messageData;
      })
      .addCase(getTickets.rejected, (state, action) => {
        console.log({ action });
        state.getTicketsLoading = false;
        state.errorMsg = action?.payload;
      })
      // /////////////////////////////// ------------------------------
      .addCase(getMyTickets.pending, (state) => {
        state.getTicketsLoading = true;
        state.errorMsg = null;
      })
      .addCase(getMyTickets.fulfilled, (state, action) => {
        console.log({ action });
        state.getTicketsLoading = false;
        state.errorMsg = null;
        state.myTickets = action?.payload?.messageData;
      })
      .addCase(getMyTickets.rejected, (state, action) => {
        console.log({ action });
        state.getTicketsLoading = false;
        state.errorMsg = action?.payload;
      })

      // /////////////////////////////// ------------------------------
      .addCase(getTicket.pending, (state) => {
        state.getTicketsLoading = true;
        state.errorMsg = null;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        console.log({ action });
        state.getTicketsLoading = false;
        state.errorMsg = null;
        state.ticket = action?.payload?.messageData;
      })
      .addCase(getTicket.rejected, (state, action) => {
        console.log({ action });
        state.getTicketsLoading = false;
        state.errorMsg = action?.payload;
      })
      // /////////////////////////////// ------------------------------
      .addCase(answerTicketByAdmin.pending, (state) => {
        state.answerTicketLoading = true;
        state.errorMsg = null;
      })
      .addCase(answerTicketByAdmin.fulfilled, (state, action) => {
        console.log({ action });
        state.answerTicketLoading = false;
        state.errorMsg = null;
        state.answerTicket = action?.payload?.messageData;
      })
      .addCase(answerTicketByAdmin.rejected, (state, action) => {
        console.log({ action });
        state.answerTicketLoading = false;
        state.errorMsg = action?.payload;
      });
  },
});

export default ticketSlice.reducer;
