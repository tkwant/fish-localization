FROM nvidia/cuda:10.1-base-ubuntu18.04

ENV DEBIAN_FRONTEND=noninteractive 

ENV PATH="/root/miniconda3/bin:${PATH}"
ARG PATH="/root/miniconda3/bin:${PATH}"
RUN apt-get update

RUN apt-get update && apt-get install -y --no-install-recommends wget bzip2 python3.5 python3-pip python3-setuptools python3-dev libmysqlclient-dev build-essential libigraph0-dev netcat nano htop libsm6 libxext6 && rm -rf /var/lib/apt/lists/*
# Install Backend Dependencies
RUN apt-get update && apt-get install -y --no-install-recommends wget curl bzip2 python3.5 \
    python3-pip python3-setuptools python3-dev build-essential libigraph0-dev netcat nano \
    htop libsm6 libxext6 libssl-dev && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -y --no-install-recommends gnupg gnupg2 libgl1-mesa-glx && rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y --no-install-recommends libopencv-dev python3-opencv && rm -rf /var/lib/apt/lists/*
RUN wget \
    https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh \
    && mkdir /root/.conda \
    && bash Miniconda3-latest-Linux-x86_64.sh -b \
    && rm -f Miniconda3-latest-Linux-x86_64.sh 
RUN conda --version


# RUN export PYTHONPATH=$PYTHONPATH:/code/backend
# RUN pip install --upgrade pip
RUN pip install --no-cache-dir torch==1.8.1
RUN pip install --no-cache-dir torchvision==0.9.1
RUN pip install --no-cache-dir pylidc==0.2.2
RUN pip install --no-cache-dir matplotlib==3.1.3
RUN pip install --no-cache-dir scikit-image==0.16.2
RUN pip install --no-cache-dir ipdb==0.13.7
RUN pip install --no-cache-dir tqdm==4.42.1
RUN pip install --no-cache-dir pandas==1.0.1
RUN pip install --no-cache-dir scikit-learn==0.22.1
RUN pip install --no-cache-dir haven-ai
RUN pip install --no-cache-dir opencv-python==4.2.0.32
RUN pip install --no-cache-dir pymongocd

RUN pip install --no-cache-dir flask
RUN pip install --no-cache-dir pytest
RUN pip install --no-cache-dir pytest-cov
RUN pip install --no-cache-dir codecov
RUN pip install --no-cache-dir flask-cors
RUN mkdir -p /workspace/backend/app
WORKDIR /workspace
COPY ./ /workspace/backend/app
CMD ["python","-u", "backend/app/app.py"]


