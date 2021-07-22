"use strict";
{
    class VideoModal {
        constructor() {
            this.makeString = () => {
                const string = `
              <p class="cancel">❌</p>
              <div class="input-box">
                  <p class="input-title">Title</p>
                  <input
                    id="title"
                    type="text"
                    autocomplete="off"
                    placeholder="title을 입력하세요"
                  />
              </div>
          <div class="input-box">
              <p class="input-title">Url</p>
              <input
                id="url"
                type="text"
                autocomplete="off"
                placeholder="url을 입력하세요"
                value="https://www.youtube.com/embed/kBlo6t4hBjQ"
              />
          </div>
          <div class="input-box">
          <p class="input-title">contents</p>
          <input
            id="contents"
            type="text"
            autocomplete="off"
            placeholder="contents를 입력하세요"
          />
      </div>
         <button class="addBtn" >add</button>
        `;
                return string;
            };
            this.returnString = () => {
                const s = this.makeString();
                return s;
            };
            this.returnInfo = () => {
                const title = document.querySelector("#title");
                const url = document.querySelector("#url");
                const contents = document.querySelector("#contents");
                return {
                    id: "video",
                    title: title.value,
                    url: url.value,
                    contents: contents.value,
                };
            };
        }
    }
    class ImgModal {
        constructor() {
            this.makeString = (numObj) => {
                const string = `
              <p class="cancel">❌</p>
              <div class="input-box">
                  <p class="input-title">Title</p>
                  <input
                    id="title"
                    type="text"
                    autocomplete="off"
                    placeholder="title을 입력하세요"
                  />
              </div>
          <div class="input-box">
              <p class="input-title">Url</p>
              <input
                id="url"
                type="text"
                autocomplete="off"
                placeholder="url을 입력하세요"
                required
                value='https://picsum.photos/id/${numObj.id}/${numObj.width}/300'
              />
          </div>
          <div class="input-box">
              <p class="input-title">contents</p>
              <input
                id="contents"
                type="text"
                autocomplete="off"
                placeholder="contents를 입력하세요"
              />
              </div>
              <button class="addBtn" type="submit" >add</button>
         
        `;
                return string;
            };
            this.makeRandomnumber = () => {
                const minId = 0;
                const maxId = 1084;
                const minWidth = 100;
                const maxWidth = 700;
                const id = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
                const width = maxWidth -
                    minWidth *
                        Math.floor(Math.random() * (maxWidth / 100 - minWidth / 100 + 1)) +
                    minWidth;
                return { id, width };
            };
            this.returnString = () => {
                const numObj = this.makeRandomnumber();
                const s = this.makeString(numObj);
                return s;
            };
            this.returnInfo = () => {
                const title = document.querySelector("#title");
                const url = document.querySelector("#url");
                const contents = document.querySelector("#contents");
                return {
                    id: "img",
                    title: title.value,
                    url: url.value,
                    contents: contents.value,
                };
            };
        }
    }
    class NoteModal {
        constructor() {
            this.returnString = () => {
                const s = this.makeString();
                return s;
            };
            this.returnInfo = () => {
                const title = document.querySelector("#title");
                const contents = document.querySelector("#contents");
                return {
                    id: "note",
                    title: title.value,
                    contents: contents.value,
                };
            };
        }
        makeString() {
            const string = `
              <p class="cancel">❌</p>
              <div class="input-box">
                  <p class="input-title">Title</p>
                  <input
                    id="title"
                    type="text"
                    autocomplete="off"
                    placeholder="title을 입력하세요"
                  />
              </div>
          <div class="input-box">
              <p class="input-title">contents</p>
              <input
                id="contents"
                type="text"
                autocomplete="off"
                placeholder="contents를 입력하세요"
              />
          </div>
          <button class="addBtn" type="submit">add</button>
        `;
            return string;
        }
    }
    class TodoModal {
        constructor() {
            this.returnString = () => {
                const s = this.makeString();
                return s;
            };
            this.returnInfo = () => {
                const title = document.querySelector("#title");
                const contents = document.querySelector("#contents");
                return {
                    id: "todoList",
                    title: title.value,
                    contents: contents.value,
                };
            };
        }
        makeString() {
            const string = `
              <p class="cancel">❌</p>
              <div class="input-box">
                  <p class="input-title">Title</p>
                  <input
                    id="title"
                    type="text"
                    autocomplete="off"
                    placeholder="title을 입력하세요"
                  />
              </div>
          <div class="input-box">
              <p class="input-title">contents</p>
              <input
                id="contents"
                type="text"
                autocomplete="off"
                placeholder="contents를 입력하세요"
              />
          </div>
          <button class="addBtn" type="submit">add</button>
        `;
            return string;
        }
    }
    class ModalWindowImpl {
        constructor(modal) {
            this.modal = modal;
            this.form = document.querySelector(".form");
            this.run = () => {
                this.makeModalWindow();
                const addBtn = document.querySelector(".addBtn");
                addBtn.addEventListener("click", this.onAdd);
                const cancelBtn = document.querySelector(".cancel");
                cancelBtn.addEventListener("click", this.cancel);
            };
            // 모달창 만들기
            this.makeModalWindow = () => {
                this.createBackground();
                this.form.classList.add("selected");
                const formContaniner = document.createElement("div");
                formContaniner.classList.add("container");
                const returned = this.modal.returnString();
                formContaniner.innerHTML = returned;
                this.form.appendChild(formContaniner);
                this.focusTitle();
            };
            this.focusTitle = () => {
                const title = document.querySelector("#title");
                title.focus();
            };
            this.onAdd = () => {
                const page = new PageImpl();
                page.onAdd(this.modal);
                this.cancel();
            };
            this.cancel = () => {
                const page = new PageImpl();
                page.cancel(this.form);
            };
        }
        // 모달 검정 뒷배경 레이어
        createBackground() {
            const bg = document.createElement("div");
            bg.classList.add("focused");
            document.body.appendChild(bg);
        }
    }
    class PageImpl {
        constructor() {
            this.deleteBtn = document.createElement("button");
            this.onAdd = (modal) => {
                const info = modal.returnInfo();
                switch (info.id) {
                    case "video":
                    case "img":
                        this.OnVideoAndImg(info);
                        break;
                    case "note":
                    case "todoList":
                        if (info.url === "" || info.contents === "")
                            return;
                        this.OnNoteAndTodoList(info);
                        break;
                }
                this.dragAndDrop();
                this.deleteBtn.addEventListener("click", this.delete);
            };
            this.cancel = (form) => {
                const bg = document.querySelector(".focused");
                bg.classList.remove("focused");
                form.classList.remove("selected");
                const container = document.querySelector(".container");
                container.remove();
            };
            this.delete = (e) => {
                const target = e.target.closest("li");
                target.remove();
            };
            this.dragAndDrop = () => {
                const draggables = document.querySelectorAll(".draggable");
                const containers = document.querySelectorAll(".main-content");
                draggables.forEach((draggable) => {
                    draggable.addEventListener("dragstart", () => {
                        draggable.classList.add("dragging");
                    });
                    draggable.addEventListener("dragend", () => {
                        draggable.classList.remove("dragging");
                    });
                });
                containers.forEach((container) => {
                    container.addEventListener("dragover", (e) => {
                        e.preventDefault();
                        const afterElement = this.getElement(container, e.clientY);
                        const draggable = document.querySelector(".dragging");
                        if (afterElement == null) {
                            container.appendChild(draggable);
                        }
                        else {
                            container.insertBefore(draggable, afterElement);
                        }
                    });
                });
            };
            this.getElement = (container, y) => {
                const draggableElements = [
                    ...container.querySelectorAll(".draggable:not(.dragging)"),
                ];
                return draggableElements.reduce((closest, child) => {
                    const box = child.getBoundingClientRect();
                    const offset = y - box.top - box.height / 2;
                    if (offset < 0 && offset > closest.offset) {
                        return { offset: offset, element: child };
                    }
                    else {
                        return closest;
                    }
                }, { offset: Number.NEGATIVE_INFINITY }).element;
            };
            // 비디오와 이미지 페이지에 붙이기
            this.OnVideoAndImg = ({ id, title, url, contents }) => {
                const list = document.createElement("li");
                list.classList.add(`content-${id}`, "draggable");
                list.setAttribute("draggable", "true");
                const note = document.querySelector(`.main-${id}`);
                if (id === "img") {
                    list.innerHTML = `
        <p class="img-title">${title}</p>
        <img class="img-url" alt=" 이미지를 불러올 수 없습니다." src="${url}">
        <p class="note-contents" style="background : none">${contents}</p>

      `;
                }
                else {
                    list.innerHTML = `
        <p class="video-title">${title}</p>
        <iframe class="video-url" src="${url}" width="100%" height="400px"></iframe>
        <p class="note-contents" style="background : none">${contents}</p>
      `;
                }
                this.attachDelteBtn(list);
                this.stringToHtml(note, list);
            };
            // 노트와 투두리스트 페이지에 붙이기
            this.OnNoteAndTodoList = ({ id, title, contents }) => {
                const list = document.createElement("li");
                list.classList.add(`content-${id}`, "draggable");
                list.setAttribute("draggable", "true");
                const note = document.querySelector(`.main-${id}`);
                if (id === "note") {
                    list.innerHTML = `
        <h2 class="note-title">${title}</h2>
        <p class="note-contents">${contents}</p>
      `;
                }
                else {
                    list.innerHTML = `
        <h2 class="todoList-title">${title}</h2>
        <label><input type='checkbox' class="todoList-contents">${contents}</label>
      `;
                }
                this.attachDelteBtn(list);
                this.stringToHtml(note, list);
            };
            this.attachDelteBtn = (list) => {
                this.deleteBtn.classList.add("deleteBtn");
                this.deleteBtn.innerHTML = " ❌ ";
                list.insertBefore(this.deleteBtn, list.firstChild);
            };
        }
        stringToHtml(page, list) {
            page.appendChild(list);
        }
    }
    const videoModal = new VideoModal();
    const imgModal = new ImgModal();
    const noteModal = new NoteModal();
    const todoModal = new TodoModal();
    const headerBtn = document.querySelector(".header-buttons");
    headerBtn.addEventListener("click", (e) => {
        const target = e.target;
        switch (target.className) {
            case "video":
                const video = new ModalWindowImpl(videoModal);
                video.run();
                break;
            case "img":
                const img = new ModalWindowImpl(imgModal);
                img.run();
                break;
            case "note":
                const note = new ModalWindowImpl(noteModal);
                note.run();
                break;
            case "todoList":
                const todo = new ModalWindowImpl(todoModal);
                todo.run();
                break;
            default:
                return;
        }
    });
}
//# sourceMappingURL=main.js.map