# Dockerfile
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# Instalar openssh-server, sudo y utilidades
RUN apt-get update \
 && apt-get install -y --no-install-recommends openssh-server sudo passwd ca-certificates curl vim \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# Crear la carpeta para sshd
RUN mkdir /var/run/sshd

# Crear usuario 'ansible' con password 'ansible' y sin password sudo
RUN useradd -m -s /bin/bash ansible \
 && echo "ansible:ansible" | chpasswd \
 && usermod -aG sudo ansible \
 && echo "ansible ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/ansible \
 && chmod 0440 /etc/sudoers.d/ansible

# Permitir autenticación por contraseña en sshd
RUN sed -i 's/^#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config || true \
 && sed -i 's/^PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config || true \
 && sed -i 's/^#PermitRootLogin prohibit-password/PermitRootLogin no/' /etc/ssh/sshd_config || true

EXPOSE 22

CMD ["/usr/sbin/sshd","-D"]
