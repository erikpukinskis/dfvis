FROM debian:bullseye-slim

RUN sed -i -e's/ main/ main non-free/g' /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y bzip2

# Install Turbo
RUN apt-get install -y luajit
RUN apt-get install -y luarocks
RUN apt-get install -y git
RUN apt-get install -y build-essential
RUN apt-get install -y libssl-dev
RUN luarocks install turbo
RUN apt-get install -y procps

# Install dwarf fortress
WORKDIR /df
RUN apt-get install -y libncursesw5
RUN apt-get install -y dwarf-fortress
ADD http://www.bay12games.com/dwarves/df_47_05_linux.tar.bz2 .
RUN tar -xf df_47_05_linux.tar.bz2
RUN rm df_linux/libs/libstdc++.so.6
ADD init.txt df_linux/data/init

# Install dfvis
WORKDIR /df
ADD https://github.com/DFHack/dfhack/releases/download/0.47.05-r3/dfhack-0.47.05-r3-Linux-64bit-gcc-7.tar.bz2 .
RUN tar -xf dfhack-0.47.05-r3-Linux-64bit-gcc-7.tar.bz2 --directory df_linux/
ADD dfhack.init df_linux
ADD save/region1 df_linux/data/save/region1

# Install dependencies for daemon
WORKDIR /df
RUN luarocks install http
ADD lua-http df_linux/hack/lua/lua-http

WORKDIR /server
ENTRYPOINT sleep infinity

# ENTRYPOINT /df/df_linux/dfhack
