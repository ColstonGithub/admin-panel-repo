import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

const CategoryRow = ({ id, index, name, data, moveRow }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "category",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, dropRef] = useDrop({
    accept: "category",
    hover: (item, monitor) => {
      if (item.index !== index) {
        // Swap the positions of the dragged item and the current item
        const draggedIndex = item.index;
        const targetIndex = index;
        moveRow(draggedIndex, targetIndex);
        item.index = targetIndex;
      }
    },
  });

  const opacity = isDragging ? 0.5 : 1;

  const handleMoveUp = () => {
    moveRow(index, index - 1);
  };

  const handleMoveDown = () => {
    moveRow(index, index + 1);
  };

  return (
    <TableRow ref={(node) => dragRef(dropRef(node))} style={{ opacity }}>
      <TableCell>
        <IconButton disabled={index === 0} onClick={handleMoveUp}>
          <ArrowUpward />
        </IconButton>
        <IconButton
          disabled={index === data?.length - 1}
          onClick={handleMoveDown}
        >
          <ArrowDownward />
        </IconButton>
      </TableCell>
      <TableCell>{name}</TableCell>
      {/* Add more cells for other category properties */}
    </TableRow>
  );
};

const CategoryTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://64.227.150.49:5000/api/category/getcategory"
      );
      console.log("response ", response);
      setData(response.data.categoryList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const moveRow = (fromIndex, toIndex) => {
    const newData = [...data];
    const movedItem = newData.splice(fromIndex, 1)[0];
    newData.splice(toIndex, 0, movedItem);
    setData(newData);
  };

  const handleSaveOrder = async () => {
    const categoryOrder = data.map((category) => category._id);
    try {
      await axios.put("/api/categories/order", { categoryOrder });
      fetchData();
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  return (




    <div>
      <DndProvider backend={HTML5Backend}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order</TableCell>
                <TableCell>Name</TableCell>
                {/* Add more cells for other category properties */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.map((category, index) => (
                <CategoryRow
                  key={category._id}
                  id={category._id}
                  index={index}
                  name={category.name}
                  moveRow={moveRow}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          onClick={handleSaveOrder}
          style={{ marginTop: "16px" }}
        >
          Save Order
        </Button>
      </DndProvider>
    </div>
  );
};

export default CategoryTable;