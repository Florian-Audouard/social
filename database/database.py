from dotenv import dotenv_values
import psycopg
import os
import urllib.parse

os.chdir(os.path.dirname(__file__))

default_look_filename = ".env"
if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1 and (sys.argv[0] == "--site" or sys.argv[1] == "--site"):
        default_look_filename = "site.env"

if os.path.exists(default_look_filename):
    config = dotenv_values(default_look_filename)
else:
    config = {
        "USER": os.environ.get("USER_DB"),
        "PASSWORD": os.environ.get("PASSWORD_DB"),
        "HOST": os.environ.get("HOST_DB"),
        "PORT": os.environ.get("PORT_DB"),
        "DATABASE": os.environ.get("DATABASE_DB"),
    }

FILENAME_DB_SHEMA = "database.sql"
options = urllib.parse.quote_plus("--search_path=modern,public")
CONN_PARAMS = f"postgresql://{config['USER']}:{config['PASSWORD']}@{config['HOST']}:{config['PORT']}/{config['DATABASE']}?options={options}"  # pylint: disable=line-too-long


def reset_table():
    with psycopg.connect(CONN_PARAMS) as conn:  # pylint: disable=not-context-manager
        with conn.cursor() as cur:
            with open(FILENAME_DB_SHEMA, "r", encoding="utf-8") as file:
                cur.execute(file.read())


def get_feed_database(autor):  # pylint: disable=missing-function-docstring
    with psycopg.connect(CONN_PARAMS) as conn:  # pylint: disable=not-context-manager
        with conn.cursor() as cur:
            if autor == "all":
                cur.execute("select * from data_social;")
            else:
                cur.execute(
                    "select * from data_social WHERE autor = %(autor)s;",
                    {"autor": autor},
                )
            return cur.fetchall()


def add_message(autor, msg):  # pylint: disable=missing-function-docstring
    with psycopg.connect(CONN_PARAMS) as conn:  # pylint: disable=not-context-manager
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO data_social (un_text,autor) VALUES (%(msg)s,%(autor)s);",
                {"msg": str(msg), "autor": str(autor)},
            )


def is_username_available(username):  # pylint: disable=missing-function-docstring
    with psycopg.connect(CONN_PARAMS) as conn:  # pylint: disable=not-context-manager
        with conn.cursor() as cur:
            cur.execute(
                "SELECT count(username) FROM account WHERE username = %(username)s;",
                {"username": str(username)},
            )
            if cur.fetchall()[0][0] == 1:
                return False
            return True


def create_account(username, password):
    with psycopg.connect(CONN_PARAMS) as conn:  # pylint: disable=not-context-manager
        with conn.cursor() as cur:
            cur.execute(
                "SELECT count(username) FROM account WHERE username = %(username)s;",
                {"username": str(username)},
            )
            if cur.fetchall()[0][0] == 1:
                return False
            cur.execute(
                "INSERT INTO account (username,password) VALUES (%(username)s,%(password)s);",
                {"username": str(username), "password": str(password)},
            )
            return True


def auth(cur, username, password):
    cur.execute(
        "SELECT count(username) FROM account WHERE username = %(username)s AND password = %(password)s;",
        {"username": str(username), "password": str(password)},
    )
    if cur.fetchall()[0][0] == 1:
        return True
    return False


def connection(username, password):
    with psycopg.connect(CONN_PARAMS) as conn:  # pylint: disable=not-context-manager
        with conn.cursor() as cur:
            return auth(cur, username, password)


if __name__ == "__main__":
    reset_table()
