// Storage Controller
const StorageCtrl = (function () {

  //Storage Controller: Public Methods
  return {
    storeItem: function (item) {
      let items;
      // Check if any items in ls
      if (localStorage.getItem('items') === null) {
        items = [];
        //Push new item
        items.push(item);
        // Set ls
        localStorage.setItem('items', JSON.stringify(items));

      } else {
        items = JSON.parse(localStorage.getItem('items'));

        // Push new item
        items.push(item);

        // Re set ls
        items = localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemsFromStorage: function () {
      if (localStorage.getItem('items') == null) {
        items = []
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items
    },
    removeItemFromStorage: function (deletedItem) {
      items = JSON.parse(localStorage.getItem('items'));
      items.forEach(item => {
        if (item.id === deletedItem.id) {
          items.splice(items.indexOf(item), 1);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    updateItemFromStorage: function (updatedItem) {
      items = JSON.parse(localStorage.getItem('items'));
      items.forEach(item => {
        if (item.id === updatedItem.id) {
          item.name = updatedItem.name;
          item.calories = updatedItem.calories;
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    clearData: function () {
      localStorage.clear();
    }
  }
})();

// Item Controller
const ItemCtrl = (function () {
  // Item Contructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure / State
  const data = {
    items: StorageCtrl.getItemsFromStorage(),

    currentItem: null,

    totalCalories: 0,
  };

  // Item controller: Public Methods
  return {
    getItems: function () {
      return data.items;
    },

    addItem: function (name, calories) {
      // Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create new item
      newItem = new Item(ID, name, calories);

      // Push new item to data structure
      data.items.push(newItem);

      return newItem;
    },

    getItemById: function (id) {
      let found = null;
      // Loop through looking for id
      data.items.forEach(item => {
        if (item.id === id) {
          found = item;
        }
      });
      return found
    },

    setCurrentItem: function (item) {
      data.currentItem = item;
    },

    getCurrentItem: function () {
      return data.currentItem;
    },

    logData: function () {
      return data
    },

    getTotalCalories: function () {
      let totCals = 0;

      // Loop through items, adding their calories
      data.items.forEach(item => {
        totCals += parseInt(item.calories);
      });
      data.totalCalories = totCals;

      // Return total
      return data.totalCalories;
    },

    updateItem: function (name, calories) {
      // Calories to number
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(item => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found
    },

    deleteCurrentItem: function () {
      data.items.splice(data.items.indexOf(data.currentItem), 1);
      return data.currentItem
    },

    clearData: function () {
      data.items = [];
      data.currentItem = null;
    }

  };


})();

// UI Controller
const UICtrl = (function () {

  // UI Selectors
  const UISelectors = {
    clearAllBtn: '.clear-btn',
    itemCardTitle: '.card-title',
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.remove-btn',
    backBtn: '.back-btn',
    itemEditBtn: '.edit-item',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories',

  }

  // UI Controller: Public methods
  return {
    populateItemList: function (items) {
      let html = '';

      items.forEach(function (item) {
        html += `
        <li class="collection-item" id="item-${item.id}">
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content"
            ><i class="edit-item fas fa-pen"></i
          ></a>
        </li>
        `;
      });

      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    // Get item input
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },

    // Add list item
    addListItem: function (item) {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Add ID 
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `
      <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content"
        ><i class="edit-item fas fa-pen"></i
      ></a>
      `;
      document.querySelector(UISelectors.itemList).appendChild(li);
    },

    // Get UISelectors
    getSelectors: function () {
      return UISelectors;
    },

    // Clear Fields
    clearFields: function () {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },

    // Enter edit state and populate form with item's data
    addItemToForm: function () {
      UICtrl.enterItemEditState();
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
    },

    // Hide List
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },

    // Update total calories
    updateTotalCalories: function (cals) {
      document.querySelector(UISelectors.totalCalories).textContent = cals;
    },

    // Clear Edit State
    exitEditState: function () {
      UICtrl.clearFields();
      document.querySelector(UISelectors.itemCardTitle).textContent = 'Add Item';
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },

    // Delegated event for edit item click - Set Edit State
    enterItemEditState: function () {
      UICtrl.clearFields();
      document.querySelector(UISelectors.itemCardTitle).textContent = 'Edit Item';
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },

    // Show updated item
    updateListItem: function (item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn node list into array
      listItems = Array.from(listItems);

      listItems.forEach(function (listItem) {
        const itemId = listItem.getAttribute('id');

        if (itemId === `item-${item.id}`) {
          document.querySelector(`#${itemId}`).innerHTML =
            `
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content"
        ><i class="edit-item fas fa-pen"></i
      ></a>
          `
        }
      })
    },

    // Remove deleted item
    removeListItem: function (item) {
      document.querySelector(`#item-${item.id}`).remove();
    },

    // Clear items
    clearItems: function () {
      document.querySelector('#item-list').innerHTML = '';
    }
  };
})();

// App Controller
const App = (function (ItemCtrl, UICtrl) {

  // Load Event Listeners
  const loadEventListeners = function () {

    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    // Add submit item Event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Disable submit on ender
    document.addEventListener('keypress', function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    })

    // Add item-list listener for delegation
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // Delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    // Back (exit edit) event
    document.querySelector(UISelectors.backBtn).addEventListener('click', exitEditState);

    // Clear all event
    document.querySelector(UISelectors.clearAllBtn).addEventListener('click', clearAll);

  }



  // Add item submit
  const itemAddSubmit = function (e) {

    // Get form input from UICtrl
    const input = UICtrl.getItemInput();

    if (input.name !== '' && input.calories !== '') {

      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add li element to HTML
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Update UI Total calories
      UICtrl.updateTotalCalories(totalCalories);

      // Store in localStorage
      StorageCtrl.storeItem(newItem);

      // Clear fields
      UICtrl.clearFields();
    }

    e.preventDefault();
  }

  // Edit item click
  const itemEditClick = function (e) {
    if (e.target.classList.contains('edit-item')) {

      // Get list item id
      const listId = e.target.parentNode.parentNode.id;

      // Break into an array
      const listIdArr = listId.split('-');

      // Get just id
      const id = parseInt(listIdArr[1]);

      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();
    }

    e.preventDefault();

  }

  // Item update submit
  const itemUpdateSubmit = function (e) {
    e.preventDefault();

    // Get item input
    const input = UICtrl.getItemInput();

    // Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories)

    // Update UI with updated item
    UICtrl.updateListItem(updatedItem);

    // Update item in ls
    StorageCtrl.updateItemFromStorage(updatedItem);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Update UI Total calories
    UICtrl.updateTotalCalories(totalCalories);

    // Clear edit state
    UICtrl.exitEditState();
  }

  // Delete button submit
  const itemDeleteSubmit = function (e) {
    e.preventDefault();

    // Delete item
    const deletedItem = ItemCtrl.deleteCurrentItem();

    // Update UI excluding deleted item
    UICtrl.removeListItem(deletedItem);

    // Remove item from ls
    StorageCtrl.removeItemFromStorage(deletedItem);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Update UI Total calories
    UICtrl.updateTotalCalories(totalCalories);

    // Clear edit state
    UICtrl.exitEditState();
  }

  // Exit edit state via back button
  const exitEditState = function (e) {
    e.preventDefault();
    UICtrl.exitEditState();
  }

  // Clear all items
  const clearAll = function (e) {
    e.preventDefault();

    ItemCtrl.clearData();
    ItemCtrl.getTotalCalories();
    StorageCtrl.clearData();
    UICtrl.clearItems();
    UICtrl.updateTotalCalories(0);
    UICtrl.exitEditState();
    UICtrl.hideList();

  }

  // App Controller: Public methods
  return {
    init: function () {

      // Clear edit state
      UICtrl.exitEditState();

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Update UI Total calories
      UICtrl.updateTotalCalories(totalCalories);

      // Load event listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl, StorageCtrl);

// Initialize App
App.init();
