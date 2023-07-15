import supabase from "../supabaseClient.js";

export const getCalendar = async (req, res) => {
  const token = req.header("Authorization");

  try {
    const requester = supabase({
      global: {
        headers: {
          Authorization: token,
        },
      },
    });
    const { data, error } = await requester.from("calendars").select();

    if (error) {
      res.status(500).json({ error });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching your data" });
  }
};

export const updateCalendar = async (req, res) => {
  const { body, params } = req;
  const token = req.header("Authorization");

  try {
    const requester = supabase({
      global: {
        headers: {
          Authorization: token,
        },
      },
    });
    const { error } = await requester
      .from("calendars")
      .update(body)
      .eq("id", params.id);

    if (error) {
      res.status(500).json({ error });
    }
    res.status(200).send(`Calendar with id: ${params.id} has been modified`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating your entry" });
  }
};

export const deleteCalendar = async (req, res) => {
  const { params } = req;
  const token = req.header("Authorization");

  try {
    const requester = supabase({
      global: {
        headers: {
          Authorization: token,
        },
      },
    });
    const { error } = await requester
      .from("calendars")
      .delete()
      .eq("id", params.id);

    if (error) {
      res.status(500).json({ error });
    }
    res.status(200).send(`Calendar with id: ${params.id} has been deleted`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting your entry" });
  }
};

export const postCalendar = async (req, res) => {
  const { body } = req;
  const token = req.header("Authorization");

  try {
    const requester = supabase({
      global: {
        headers: {
          Authorization: token,
        },
      },
    });
    const { error } = await requester.from("calendars").insert(body);

    if (error) {
      res.status(500).json({ error });
    }
    res.status(200).send(`Calendar added successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding your data" });
  }
};