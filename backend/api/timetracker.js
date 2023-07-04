import supabase from "../supabaseClient.js";

export const getTimeTracker = async (req, res) => {
  const { query } = req;
  const token = req.header("Authorization");

  try {
    const requester = supabase({
      global: {
        headers: {
          Authorization: token,
        },
      },
    });
    const { data, error } = await requester
      .from("time_tracker")
      .select(query.filter);

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

export const postTimeTracker = async (req, res) => {
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
    const { error } = await requester.from("time_tracker").insert(body);

    if (error) {
      res.status(500).json({ error });
    }
    res.status(200).send(`Time added successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding your data" });
  }
};

export const updateTimeTracker = async (req, res) => {
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
      .from("time_tracker")
      .update(body)
      .eq("id", params.id);

    if (error) {
      res.status(500).json({ error });
    }
    res.status(200).send(`Time with id: ${params.id} has been modified`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating your entry" });
  }
};

export const deleteTimeTracker = async (req, res) => {
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
      .from("time_tracker")
      .delete()
      .eq("id", params.id);

    if (error) {
      res.status(500).json({ error });
    }
    res.status(200).send(`Time with id: ${params.id} has been deleted`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting your entry" });
  }
};