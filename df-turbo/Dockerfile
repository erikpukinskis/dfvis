FROM debian:bullseye-slim

# Install dwarf fortress

WORKDIR /df
RUN sed -i -e's/ main/ main non-free/g' /etc/apt/sources.list
RUN apt-get update
# RUN sudo apt install libsdl1.2debian libsdl-image1.2 libsdl-ttf2.0-0 libgtk2.0-0 libopenal1 libsndfile1 libncursesw5
RUN apt-get install -y libncursesw5
RUN apt-get install -y dwarf-fortress

# Install dfvis

WORKDIR /df
ADD https://github.com/DFHack/dfhack/releases/download/0.47.05-r3/dfhack-0.47.05-r3-Linux-64bit-gcc-7.tar.bz2 .
RUN apt-get install bzip2
RUN tar -xf dfhack-0.47.05-r3-Linux-64bit-gcc-7.tar.bz2 --one-top-level

# Install Turbo
RUN apt-get install -y luajit
RUN apt-get install -y luarocks
RUN apt-get install -y git
RUN apt-get install -y build-essential
RUN apt-get install -y libssl-dev
RUN luarocks install turbo
RUN apt-get install -y procps

WORKDIR /server
ENTRYPOINT turbovisor main.lua
