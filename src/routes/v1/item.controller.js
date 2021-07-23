import express from "express";
import bodyParser from "body-parser";
import {
  createItem,
  deleteImage,
  deleteItem,
  getItem,
  searchItem,
  updateItem,
} from "../../service/item.service";
import VerifyToken from "../../utils/VerifyToken";

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.delete("/image", (req, res) => {
  deleteImage();
});

/* router.post("/upload-image", upload.single("file"), function(req, res) {
  res.status("201").send("Uploaded");
}); */

// CREATES A NEW ITEM
router.post(
  "/",
  VerifyToken,
  async (req, res) => {
    try {
      const item = await createItem(req);
      res.status(201).send(item);
    } catch (err) {
      return res
        .status(500)
        .send("There was a problem adding the information to the database.");
    }
  }
);

// GETS A SINGLE ITEM FROM THE DATABASE
router.get("/:id", async (req, res) => {
  try {
    const item = await getItem(req.params.id);
    if (!item) return res.status(404).send("No item found.");
    res.status(200).send(item);
  } catch (err) {
    console.log(err);
    return res.status(500).send("There was a problem finding the item.");
  }
});

// RETURNS ALL THE ITEMS IN THE DATABASE
router.get("/", async (req, res) => {
  try {
    const searchString = req.query?.searchString
    let items
    if (searchString) {
      items = await searchItem(searchString)
    }
    else {
      items = await getItem();
    }
    if (!items) return res.status(404).send("No items found.");
    res.status(200).send(items);
  } catch (err) {
    console.log(err);
    return res.status(500).send("There was a problem finding the items.");
  }
});

router.delete("/:id", VerifyToken, async (req, res) => {
  try {
    await deleteItem(req.params.id);
    return res.status(200).send("Iteme: " + item.name + " was deleted.");
  } catch (err) {
    return res.status(500).send("There was a problem deleting the item.");
  }
});

// UPDATES A SINGLE ITEM IN THE DATABASE
router.put("/:id", VerifyToken, async (req, res) => {
  var conditions = { _id: req.params.id, owner: req.userId };
  try {
    await updateItem(conditions);
    res.status(200).send(item);
  } catch (err) {
    return res.status(500).send("There was a problem updating the item.");
  }
});

export default router;
