class Crud {
  db: any;

  public constructor (db: any) {
    this.db = db;
  }

  public GetById(todos_id: number) {
    return new Promise((resolve, reject) => {
      this.db.client.query("SELECT * FROM todos WHERE db = $1", todos_id, (err: any, res: any) => {
        if (err) {
          console.log(err)
          return reject(err)
        }
        console.log(res)
        return resolve(res)
      });
    })
  };

  public  GetAll() {
    return new Promise((resolve, reject) => {
      this.db.client.query("SELECT * from todos", [], (err: any, res: any) => {
        if (err) {
          console.log(err)
          return reject(err)
        }
        console.log(res)
        return resolve(res)
      });
    })
  };

  public Create(name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.query("INSERT INTO todos (name) VALUES ($1)", [name], (err: Error, res: any) => {
        if (err) {
          console.log(err)
          return reject(err)
        }
        console.log(res)
        return resolve(res)
      });
    })
  };

  public async Update(id: number, isDone?: boolean) {
      this.db.client.query("UPDATE todoss SET is_done = $1 WHERE id = $2", [id, isDone], (err: any, res: any) => {
        if (err) {
          console.log(err)
        } else {
          console.log(res)
        }
      })
  }

  public async Delete(id: number) {
    this.db.client.query("SELECT * FROM todos where id = $1", id, (err: any, res: any) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res)
      }
    })
  }
}

export default Crud