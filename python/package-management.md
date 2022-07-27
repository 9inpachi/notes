# Package Management

Python uses virtual environment to create a virtually isolated environment for a project. This environment contains all the packages and libraries the project needs which need to be installed.

To set up a virtual environment using `venv`.

```sh
python -m venv <venv_dir>
<venv_dir>/Scripts/activate
```

The dependencies are listed in `requirements.txt` separated by a line. They may also specify the version (`Flask==2.1.3`).

`requirements.txt`

```txt
Fabric
Flask-SQLAlchemy
Flask-WTF
WTForms
coverage
```

These dependencies can be installed in the virtual environment by running the following command.

```sh
pip install -r requirements.txt
```

With this, all the dependencies are set up in the virtual environment and the application is ready to run.

```sh
python app.py
```

To update the list of packages in `requirements.txt`, they have to be manually added using the following command.

```sh
pip freeze > requirements.txt
```
