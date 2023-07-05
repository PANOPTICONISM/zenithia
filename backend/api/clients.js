import supabase from "../supabaseClient.js";

export const getClients = async (req, res) => {
  const token = req.header("Authorization");

  try {
    const requester = supabase({
      global: {
        headers: {
          Authorization: token,
        },
      },
    });
    const { data, error } = await requester.from("clients").select();

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

export const updateClient = async (req, res) => {
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
      .from("clients")
      .update(body)
      .eq("id", params.id);

    if (error) {
      res.status(500).json({ error });
    }
    res.status(200).send(`Client with id: ${params.id} has been modified`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating your entry" });
  }
};

export const deleteClient = async (req, res) => {
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
      .from("clients")
      .delete()
      .eq("id", params.id);

    if (error) {
      res.status(500).json({ error });
    }
    res.status(200).send(`Client with id: ${params.id} has been deleted`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting your entry" });
  }
};

export const postClient = async (req, res) => {
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
    const { error } = await requester.from("clients").insert(body);

    if (error) {
      res.status(500).json({ error });
    }
    res.status(200).send(`Client added successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding your data" });
  }
};
