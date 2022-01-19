// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNote = addNote;
exports.archivingNote = archivingNote;
exports.categories = void 0;
exports.categoriesNotesCount = categoriesNotesCount;
exports.editNote = editNote;
exports.notes = void 0;
exports.removeNote = removeNote;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var categories = ["Task", "Random Thought", "Idea"];
exports.categories = categories;
var notes = [{
  content: "To visit the theater on 12/8/2018",
  timeOfCreation: "31/7/2021",
  isArchivalNote: true,
  category: "Idea",
  dates: ["12/8/2020"]
}, {
  content: "Walk in the woods",
  timeOfCreation: "7/9/2021",
  isArchivalNote: true,
  category: "Random Thought",
  dates: []
}, {
  content: "Прийом у лікаря 10/10/2021 та 17/10/2021",
  timeOfCreation: "2/10/2021",
  isArchivalNote: false,
  category: "Task",
  dates: ["10/10/2021", "17/10/2021"]
}, {
  content: "День народження друга 18/11/2021",
  timeOfCreation: "1/11/2021",
  isArchivalNote: false,
  category: "Random Thought",
  dates: ["18/11/2021"]
}, {
  content: "Зустрітись з друзями на вихідних",
  timeOfCreation: "15/12/2021",
  isArchivalNote: true,
  category: "Idea",
  dates: []
}, {
  content: "shopping",
  timeOfCreation: "30/12/2021",
  isArchivalNote: false,
  category: "Task",
  dates: []
}, {
  content: "Тренування в залі 12/1/2022",
  timeOfCreation: "2/12/2022",
  isArchivalNote: false,
  category: "Task",
  dates: ["12/1/2022"]
}];
exports.notes = notes;

var Note = /*#__PURE__*/_createClass(function Note(content, category) {
  _classCallCheck(this, Note);

  this.content = content;
  var date = new Date();
  this.timeOfCreation = "".concat(date.getDate(), "/").concat(date.getMonth() + 1, "/").concat(date.getFullYear());
  this.isArchivalNote = false;
  this.category = category;
  this.dates = determinationOfDates(content);
});

function addNote(value, category) {
  exports.notes = notes = [].concat(_toConsumableArray(notes), [new Note(value, category)]);
}

function editNote(index, value, category) {
  notes[index].content = value;
  notes[index].category = category;
  notes[index].dates = determinationOfDates(value);
}

function removeNote(index) {
  notes.splice(index, 1);
}

function archivingNote(index) {
  notes[index].isArchivalNote ? notes[index].isArchivalNote = false : notes[index].isArchivalNote = true;
}

function determinationOfDates(content) {
  var datesList = content.match(/\d{1,2}\/\d{1,2}\/\d{4}/gm);
  return datesList ? datesList : [];
}

function categoriesNotesCount() {
  var categoriesNotes = [];
  categories.forEach(function (category) {
    var categoryNotes = notes.filter(function (note) {
      return note.category == category;
    });
    categoriesNotes.push([category, categoryNotes.filter(function (note) {
      return note.isArchivalNote == false;
    }).length, categoryNotes.filter(function (note) {
      return note.isArchivalNote == true;
    }).length]);
  });
  return categoriesNotes;
}
},{}],"src/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addListElement = addListElement;
exports.renderCountsElement = renderCountsElement;
exports.renderNotesList = void 0;

var _model = require("./model");

var renderNotesList = fillListElement;
exports.renderNotesList = renderNotesList;

function renderCountsElement() {
  var categoriesListElement = document.querySelector("div.categories-list");
  categoriesListElement.innerHTML = "<div class=\"category-element table-header\">\n        <h2 class=\"category-name-element\">Note Category</h2>\n        <h2 class=\"active-notes-element\">Active</h2>\n        <h2 class=\"archive-notes-element\">Archived</h2>\n    </div>";
  (0, _model.categoriesNotesCount)().forEach(function (categoryCounts) {
    var categoryElement = document.createElement("div");
    categoryElement.className = "category-element";
    var categoryNameElement = document.createElement("h2");
    categoryNameElement.className = "category-name-element";
    categoryNameElement.textContent = categoryCounts[0];
    var activeNotesElement = document.createElement("h2");
    activeNotesElement.className = "active-notes-element";
    activeNotesElement.textContent = categoryCounts[1];
    var archiveNotesElement = document.createElement("h2");
    archiveNotesElement.className = "archive-notes-element";
    archiveNotesElement.textContent = categoryCounts[2];
    categoryElement.append(categoryNameElement, activeNotesElement, archiveNotesElement);
    categoriesListElement.appendChild(categoryElement);
  });
}

function fillListElement() {
  var notesListHeader = document.querySelector("div.notes-list-header");
  var notesListElement = document.querySelector("div.notes-list");
  notesListHeader.innerHTML = "<div class=\"note-columns\">\n        <p class=\"note-content\">Content</p>\n        <p class=\"note-category\">Category</p>\n        <p class=\"note-date\">Created</p>\n        <p class=\"note-dates\">Dates</p>\n        <button class=\"active-archive-btn\">Archive Notes</button>\n    </div>";
  notesListElement.innerHTML = "";

  _model.notes.forEach(function (item, index) {
    if (!item.isArchivalNote) {
      var itemElement = document.createElement("div");
      itemElement.className = "note-element";
      var contentElement = document.createElement("p");
      contentElement.textContent = item.content;
      contentElement.className = "note-content";
      var categoryElement = document.createElement("p");
      categoryElement.textContent = item.category;
      categoryElement.className = "note-category";
      var dateElement = document.createElement("h6");
      dateElement.textContent = item.timeOfCreation;
      dateElement.className = "note-date";
      var datesElement = document.createElement("div");
      datesElement.className = "note-dates";
      item.dates.forEach(function (date) {
        var dateItem = document.createElement("h6");
        dateItem.textContent = date;
        datesElement.appendChild(dateItem);
      });
      var buttons = document.createElement("div");
      buttons.className = "note-buttons";
      var editingBtn = document.createElement("button");
      var archiveBtn = document.createElement("button");
      var deleteBtn = document.createElement("button");
      editingBtn.className = "btn-edit";
      archiveBtn.className = "activate-note";
      deleteBtn.className = "btn-delete";
      editingBtn.textContent = "🖉";
      archiveBtn.textContent = "📥";
      deleteBtn.textContent = "🗑";
      editingBtn.addEventListener("click", function () {
        modalOverlay();
        var editInput = document.querySelector("textarea.input-content");
        editInput.value = _model.notes[index].content;
        var editSelect = document.querySelector("select");
        editSelect.value = _model.notes[index].category;
        var editBtn = document.querySelector("button.note-btn");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", function () {
          try {
            if (!editInput.value || editInput.value == _model.notes[index].content && editSelect.value == _model.notes[index].category) {
              throw new SyntaxError("Change error");
            }

            (0, _model.editNote)(index, editInput.value, editSelect.value);
            renderNotesList();
            closeModal();
          } catch (e) {
            if (!document.querySelector("h5.error-message")) {
              var errorMessage = document.createElement("h5");
              errorMessage.className = "error-message";
              errorMessage.textContent = e.message;
              editInput.insertAdjacentElement('afterend', errorMessage);
            }
          }
        });
      });
      archiveBtn.addEventListener("click", function () {
        (0, _model.archivingNote)(index);
        renderNotesList();
      });
      deleteBtn.addEventListener("click", function () {
        (0, _model.removeNote)(index);
        renderNotesList();
      });
      buttons.append(editingBtn, archiveBtn, deleteBtn);
      itemElement.append(contentElement, categoryElement, dateElement, datesElement, buttons);
      notesListElement.appendChild(itemElement);
    }
  });

  var archBtn = document.querySelector("button.active-archive-btn");
  archBtn.addEventListener("click", function () {
    exports.renderNotesList = renderNotesList = fillArchivalListElement;
    renderNotesList();
  });
}

function fillArchivalListElement() {
  var notesListHeader = document.querySelector("div.notes-list-header");
  var notesListElement = document.querySelector("div.notes-list");
  notesListHeader.innerHTML = "<div class=\"note-columns\">\n        <p class=\"note-content\">Content</p>\n        <p class=\"note-category\">Category</p>\n        <p class=\"note-date\">Created</p>\n        <button class=\"active-archive-btn\">Active Notes</button>\n    </div>";
  notesListElement.innerHTML = "";

  _model.notes.forEach(function (item, index) {
    if (item.isArchivalNote) {
      var itemElement = document.createElement("div");
      itemElement.classList.add("note-element", "archive-element");
      var contentElement = document.createElement("p");
      contentElement.textContent = item.content;
      contentElement.className = "note-content";
      var categoryElement = document.createElement("p");
      categoryElement.textContent = item.category;
      categoryElement.className = "note-category";
      var dateElement = document.createElement("h6");
      dateElement.textContent = item.timeOfCreation;
      dateElement.className = "note-date";
      var buttons = document.createElement("div");
      buttons.className = "note-buttons";
      var archiveBtn = document.createElement("button");
      archiveBtn.className = "activate-note";
      archiveBtn.textContent = "📤";
      archiveBtn.addEventListener("click", function () {
        (0, _model.archivingNote)(index);
        renderNotesList();
      });
      buttons.appendChild(archiveBtn);
      itemElement.append(contentElement, categoryElement, dateElement, buttons);
      notesListElement.appendChild(itemElement);
    }
  });

  var archBtn = document.querySelector("button.active-archive-btn");
  archBtn.addEventListener("click", function () {
    exports.renderNotesList = renderNotesList = fillListElement;
    renderNotesList();
  });
}

function modalOverlay() {
  var selectOptions = "<option disabled>Category</option>";

  _model.categories.forEach(function (item) {
    selectOptions += "<option>".concat(item, "</option>");
  });

  document.getElementById("root").insertAdjacentHTML("beforeend", "\n    <div class=\"modal-overlay\">\n        <div class=\"modal-window\">\n            <div class=\"close-btn-placement\">\n                <button class=\"close-modal-btn\">&#10006;</button>\n            </div>\n            <textarea class=\"input-content\"></textarea>\n            <select>".concat(selectOptions, "</select>\n            <button class=\"note-btn\"></button>\n        </div>\n    </div>\n    "));
  var closeBtn = document.querySelector("button.close-modal-btn");
  closeBtn.addEventListener("click", closeModal);
}

function closeModal() {
  document.querySelector("div.modal-overlay").remove();
}

function addListElement() {
  modalOverlay();
  var addInput = document.querySelector("textarea.input-content");
  var addBtn = document.querySelector("button.note-btn");
  var addSelect = document.querySelector("select");
  addBtn.textContent = "Add";
  addBtn.addEventListener("click", function () {
    try {
      if (!addInput.value) {
        throw new SyntaxError("The textarea is empty");
      }

      (0, _model.addNote)(addInput.value, addSelect.value);
      addInput.value = "";
      renderNotesList();
      closeModal();
    } catch (e) {
      if (!document.querySelector("h5.error-message")) {
        var errorMessage = document.createElement("h5");
        errorMessage.className = "error-message";
        errorMessage.textContent = e.message;
        addInput.insertAdjacentElement('afterend', errorMessage);
      }
    }
  });
}
},{"./model":"src/model.js"}],"src/app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _render = require("./render");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);
  }

  _createClass(App, null, [{
    key: "startApp",
    value: function startApp() {
      var createNoteBtn = document.querySelector("button.create-note-btn");
      createNoteBtn.addEventListener("click", _render.addListElement);
      (0, _render.renderNotesList)();
      (0, _render.renderCountsElement)();
      var observer = new MutationObserver(_render.renderCountsElement);
      observer.observe(document.querySelector("div.notes-list"), {
        attributes: true,
        childList: true,
        subtree: true
      });
    }
  }]);

  return App;
}();

var _default = App;
exports.default = _default;
},{"./render":"src/render.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _app = _interopRequireDefault(require("./src/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app.default.startApp();
},{"./src/app":"src/app.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64140" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/NotesApp.e31bb0bc.js.map