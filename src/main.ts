{
  interface ModalWindow {
    run(): void;
  }

  interface ModalMaker {
    returnString(): string;
    returnInfo(): Info;
  }

  interface Page {
    onAdd(modal: ModalMaker): void;
    cancel(form: HTMLFormElement): void;
    delete(e: Event): void;
    dragAndDrop(e: Event): void;
  }

  type Info = {
    id: string;
    title?: string;
    contents?: string;
    url?: string;
  };

  type NumObj = {
    id: number;
    width: number;
  };

  class VideoModal implements ModalMaker {
    private makeString = () => {
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

    returnString = (): string => {
      const s = this.makeString();
      return s;
    };

    returnInfo = (): Info => {
      const title = document.querySelector("#title") as HTMLFormElement;
      const url = document.querySelector("#url") as HTMLFormElement;
      const contents = document.querySelector("#contents") as HTMLFormElement;

      return {
        id: "video",
        title: title.value,
        url: url.value,
        contents: contents.value,
      };
    };
  }

  class ImgModal implements ModalMaker {
    private makeString = (numObj: NumObj) => {
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

    private makeRandomnumber = (): NumObj => {
      const minId = 0;
      const maxId = 1084;
      const minWidth = 100;
      const maxWidth = 700;

      const id = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
      const width =
        maxWidth -
        minWidth *
          Math.floor(Math.random() * (maxWidth / 100 - minWidth / 100 + 1)) +
        minWidth;

      return { id, width };
    };

    returnString = (): string => {
      const numObj: NumObj = this.makeRandomnumber();
      const s = this.makeString(numObj);
      return s;
    };

    returnInfo = (): Info => {
      const title = document.querySelector("#title") as HTMLFormElement;
      const url = document.querySelector("#url") as HTMLFormElement;
      const contents = document.querySelector("#contents") as HTMLFormElement;

      return {
        id: "img",
        title: title.value,
        url: url.value,
        contents: contents.value,
      };
    };
  }

  class NoteModal implements ModalMaker {
    private makeString() {
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

    returnString = (): string => {
      const s = this.makeString();
      return s;
    };

    returnInfo = (): Info => {
      const title = document.querySelector("#title") as HTMLFormElement;
      const contents = document.querySelector("#contents") as HTMLFormElement;
      return {
        id: "note",
        title: title.value,
        contents: contents.value,
      };
    };
  }

  class TodoModal implements ModalMaker {
    private makeString() {
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

    returnString = (): string => {
      const s = this.makeString();
      return s;
    };

    returnInfo = (): Info => {
      const title = document.querySelector("#title") as HTMLFormElement;
      const contents = document.querySelector("#contents") as HTMLFormElement;
      return {
        id: "todoList",
        title: title.value,
        contents: contents.value,
      };
    };
  }

  class ModalWindowImpl implements ModalWindow {
    public constructor(private modal: ModalMaker) {}

    private form = document.querySelector(".form") as HTMLFormElement;

    run = () => {
      this.makeModalWindow();

      const addBtn = document.querySelector(".addBtn") as HTMLFormElement;
      addBtn.addEventListener("click", this.onAdd);

      const cancelBtn = document.querySelector(".cancel") as HTMLFormElement;
      cancelBtn.addEventListener("click", this.cancel);
    };

    // 모달창 만들기
    private makeModalWindow = () => {
      this.createBackground();
      this.form.classList.add("selected");

      const formContaniner = document.createElement("div");
      formContaniner.classList.add("container");

      const returned = this.modal.returnString();
      formContaniner.innerHTML = returned;
      this.form.appendChild(formContaniner);

      this.focusTitle();
    };

    // 모달 검정 뒷배경 레이어
    private createBackground() {
      const bg = document.createElement("div");
      bg.classList.add("focused");
      document.body.appendChild(bg);
    }

    private focusTitle = () => {
      const title = document.querySelector("#title") as HTMLFormElement;
      title.focus();
    };

    private onAdd = () => {
      const page = new PageImpl();
      page.onAdd(this.modal);
      this.cancel();
    };

    private cancel = () => {
      const page = new PageImpl();
      page.cancel(this.form);
    };
  }

  class PageImpl implements Page {
    deleteBtn = document.createElement("button");

    onAdd = (modal: ModalMaker) => {
      const info = modal.returnInfo();

      switch (info.id) {
        case "video":
        case "img":
          this.OnVideoAndImg(info);
          break;
        case "note":
        case "todoList":
          if (info.url === "" || info.contents === "") return;
          this.OnNoteAndTodoList(info);
          break;
      }
      this.dragAndDrop();
      this.deleteBtn.addEventListener("click", this.delete);
    };

    cancel = (form: HTMLFormElement) => {
      const bg = document.querySelector(".focused") as HTMLFormElement;
      bg.classList.remove("focused");
      form.classList.remove("selected");
      const container = document.querySelector(".container") as HTMLFormElement;
      container.remove();
    };

    delete = (e: any) => {
      const target = e.target.closest("li");
      target.remove();
    };

    dragAndDrop = () => {
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
        container.addEventListener("dragover", (e: any) => {
          e.preventDefault();

          const afterElement = this.getElement(container, e.clientY);
          const draggable = document.querySelector(
            ".dragging"
          ) as HTMLFormElement;
          if (afterElement == null) {
            container.appendChild(draggable);
          } else {
            container.insertBefore(draggable, afterElement);
          }
        });
      });
    };

    getElement = (container: any, y: any) => {
      const draggableElements = [
        ...container.querySelectorAll(".draggable:not(.dragging)"),
      ];

      return draggableElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        { offset: Number.NEGATIVE_INFINITY }
      ).element;
    };

    // 비디오와 이미지 페이지에 붙이기
    private OnVideoAndImg = ({ id, title, url, contents }: Info) => {
      const list = document.createElement("li");
      list.classList.add(`content-${id}`, "draggable");
      list.setAttribute("draggable", "true");
      const note = document.querySelector(`.main-${id}`) as HTMLFormElement;
      if (id === "img") {
        list.innerHTML = `
        <p class="img-title">${title}</p>
        <img class="img-url" alt=" 이미지를 불러올 수 없습니다." src="${url}">
        <p class="note-contents" style="background : none">${contents}</p>

      `;
      } else {
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
    private OnNoteAndTodoList = ({ id, title, contents }: Info) => {
      const list = document.createElement("li");
      list.classList.add(`content-${id}`, "draggable");
      list.setAttribute("draggable", "true");
      const note = document.querySelector(`.main-${id}`) as HTMLFormElement;
      if (id === "note") {
        list.innerHTML = `
        <h2 class="note-title">${title}</h2>
        <p class="note-contents">${contents}</p>
      `;
      } else {
        list.innerHTML = `
        <h2 class="todoList-title">${title}</h2>
        <label><input type='checkbox' class="todoList-contents">${contents}</label>
      `;
      }
      this.attachDelteBtn(list);
      this.stringToHtml(note, list);
    };

    private stringToHtml(page: HTMLFormElement, list: HTMLLIElement) {
      page.appendChild(list);
    }

    private attachDelteBtn = (list: HTMLLIElement) => {
      this.deleteBtn.classList.add("deleteBtn");
      this.deleteBtn.innerHTML = " ❌ ";
      list.insertBefore(this.deleteBtn, list.firstChild);
    };
  }

  const videoModal = new VideoModal();
  const imgModal = new ImgModal();
  const noteModal = new NoteModal();
  const todoModal = new TodoModal();
  const headerBtn = document.querySelector(
    ".header-buttons"
  ) as HTMLButtonElement;

  headerBtn.addEventListener("click", (e) => {
    const target = e.target as Element;
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
