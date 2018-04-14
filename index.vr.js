import React from "react";
import {
  AppRegistry,
  asset,
  Pano,
  Image,
  Text,
  View,
  VrButton
} from "react-vr";

import BassDrop from "./bassdrop";

// Small helper function to choose item bg color.
function getDropdownItemBgColor(selectedItem, item, highlightedIndex, index) {
  if (selectedItem === item) {
    return "gray";
  }
  if (highlightedIndex === index) {
    return "lightgray";
  }
  return "white";
}

function VrDropdown({ items, placeholder }) {
  return (
    <BassDrop
      // The string to show when no item is selected/highlighted. Defaults to ''.
      placeholder={placeholder}
      // The render prop is called on each render providing prop getters and state to be used in your UI.
      // This function can alternatively be called as a child prop <BassDrop>{(stateAndHelpers) => {...}}</BassDrop>
      render={({
        // Prop getters
        getItemProps,
        getToggleButtonProps,
        getRootProps,
        // State
        isOpen,
        selectedItemIsHighlighted,
        itemDisplay,
        highlightedIndex,
        selectedItem
      }) => (
        <View
          // This is the main wrapper View for the dropdown
          style={{
            position: "absolute",
            layoutOrigin: [0.5, 0.5],
            transform: [{ translate: [0, 0, -3] }]
          }}
          billboarding={"on"}
          {...getRootProps()}
        >
          <VrButton
            // This button will control toggling the dropdown open/closed
            {...getToggleButtonProps()}
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "white",
              justifyContent: "space-between",
              alignItems: "stretch",
              height: 0.7,
              width: 3,
              paddingLeft: 0.2
            }}
          >
            <Text
              // This text represents the value or the highlighted value for the dropdown
              style={{
                backgroundColor: "white",
                color: selectedItemIsHighlighted ? "black" : "grey",
                fontSize: 0.3,
                fontWeight: "400",
                textAlign: "center",
                textAlignVertical: "center"
              }}
            >
              {itemDisplay}
            </Text>

            <View
              // This is purely presentational -- why render props rock!
              style={{
                paddingRight: 0.2,
                paddingLeft: 0.2,
                backgroundColor: "gray",
                display: "flex",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <Image
                source={asset("arrow.png")}
                style={{
                  justifyContent: "center",
                  width: 0.5,
                  height: 0.5
                }}
              />
            </View>
          </VrButton>
          {isOpen ? (
            <View
              // The list of items to be shown when the dropdown is open
              style={{
                width: 3,
                backgroundColor: "white",
                transform: [
                  {
                    translate: [0, -1.3, -0.3]
                  }
                ]
              }}
            >
              {items.map((item, index) => (
                <VrButton
                  // Each item should be a VrButton
                  {...getItemProps({
                    item,
                    index
                  })}
                  key={item}
                >
                  <Text
                    // This is the text for the item
                    style={{
                      fontSize: 0.3,
                      padding: 0.1,
                      textAlign: "center",
                      textAlignVertical: "center",
                      color: "black",
                      backgroundColor: getDropdownItemBgColor(
                        selectedItem,
                        item,
                        highlightedIndex,
                        index
                      )
                    }}
                  >
                    {item}
                  </Text>
                </VrButton>
              ))}
            </View>
          ) : null}
        </View>
      )}
    />
  );
}

const ITEMS = ["donuts", "pizza", "kale", "carrots"];

function BassDropExample() {
  return (
    <View>
      <Pano source={asset("chess-world.jpg")} />
      <VrDropdown items={ITEMS} placeholder="Select a food" />
    </View>
  );
}

AppRegistry.registerComponent("BassDropExample", () => BassDropExample);
